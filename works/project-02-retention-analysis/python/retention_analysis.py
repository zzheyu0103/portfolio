from __future__ import annotations

import csv
import json
from html import escape
from collections import Counter, defaultdict
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_FILE = BASE_DIR / "mock-data" / "player_events.csv"
OUTPUT_DIR = BASE_DIR / "outputs"


def load_rows() -> list[dict[str, str]]:
    with DATA_FILE.open("r", encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))


def to_bool(value: str) -> bool:
    return value.strip().lower() == "yes"


def pct(numerator: int, denominator: int) -> float:
    if denominator == 0:
        return 0.0
    return round((numerator / denominator) * 100, 1)


def summarize(rows: list[dict[str, str]]) -> dict[str, object]:
    players = {}
    cohorts: dict[str, list[dict[str, str]]] = defaultdict(list)
    segment_groups: dict[str, list[dict[str, str]]] = defaultdict(list)
    churn_events: Counter[str] = Counter()
    level_8_churners = 0

    for row in rows:
        player_id = row["player_id"]
        players[player_id] = row
        cohorts[row["install_date"]].append(row)
        segment_groups[row["payer_segment"]].append(row)

        if not to_bool(row["retained_d7"]):
            churn_events[row["event_type"]] += 1
            if to_bool(row["reached_level_8"]):
                level_8_churners += 1

    cohort_summary = []
    for install_date in sorted(cohorts):
        cohort_rows = cohorts[install_date]
        installs = len(cohort_rows)
        cohort_summary.append(
            {
                "install_date": install_date,
                "installs": installs,
                "retained_d1_pct": pct(sum(to_bool(row["retained_d1"]) for row in cohort_rows), installs),
                "retained_d3_pct": pct(sum(to_bool(row["retained_d3"]) for row in cohort_rows), installs),
                "retained_d7_pct": pct(sum(to_bool(row["retained_d7"]) for row in cohort_rows), installs),
            }
        )

    segment_summary = []
    for segment, segment_rows in sorted(segment_groups.items()):
        segment_summary.append(
            {
                "segment": segment,
                "players": len(segment_rows),
                "retained_d3_pct": pct(sum(to_bool(row["retained_d3"]) for row in segment_rows), len(segment_rows)),
                "retained_d7_pct": pct(sum(to_bool(row["retained_d7"]) for row in segment_rows), len(segment_rows)),
            }
        )

    total_players = len(players)
    retained_d7_players = sum(to_bool(row["retained_d7"]) for row in players.values())
    event_join_rows = [row for row in players.values() if row["event_type"] == "event_join"]
    event_ignore_rows = [row for row in players.values() if row["event_type"] == "event_ignore"]

    summary = {
        "source_file": str(DATA_FILE.relative_to(BASE_DIR)),
        "player_count": total_players,
        "retention": {
            "d1_pct": pct(sum(to_bool(row["retained_d1"]) for row in players.values()), total_players),
            "d3_pct": pct(sum(to_bool(row["retained_d3"]) for row in players.values()), total_players),
            "d7_pct": pct(retained_d7_players, total_players),
        },
        "cohort_summary": cohort_summary,
        "segment_summary": segment_summary,
        "risk_signals": {
            "level_8_churners": level_8_churners,
            "level_8_churner_pct": pct(level_8_churners, total_players),
            "event_join_d7_pct": pct(sum(to_bool(row["retained_d7"]) for row in event_join_rows), len(event_join_rows)),
            "event_ignore_d7_pct": pct(sum(to_bool(row["retained_d7"]) for row in event_ignore_rows), len(event_ignore_rows)),
        },
        "top_churn_events": [
            {"event_type": event_type, "count": count}
            for event_type, count in churn_events.most_common()
        ],
    }
    return summary


def write_csv(path: Path, rows: list[dict[str, object]], fieldnames: list[str]) -> None:
    with path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def write_text(path: Path, content: str) -> None:
    path.write_text(content, encoding="utf-8")


def render_line_chart(
    title: str,
    labels: list[str],
    series: list[tuple[str, str, list[float]]],
) -> str:
    width = 760
    height = 420
    chart_left = 88
    chart_top = 72
    chart_width = 610
    chart_height = 250
    points = max(len(labels) - 1, 1)

    svg_parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" fill="none">',
        '<rect width="100%" height="100%" rx="28" fill="#0f1b2d"/>',
        '<rect x="20" y="20" width="720" height="380" rx="22" fill="#132641" stroke="rgba(255,255,255,0.08)"/>',
        f'<text x="40" y="52" fill="#f3f7ff" font-size="24" font-family="Arial, sans-serif" font-weight="700">{escape(title)}</text>',
    ]

    for tick in range(0, 101, 25):
        y = chart_top + chart_height - (tick / 100) * chart_height
        svg_parts.append(
            f'<line x1="{chart_left}" y1="{y:.1f}" x2="{chart_left + chart_width}" y2="{y:.1f}" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>'
        )
        svg_parts.append(
            f'<text x="42" y="{y + 5:.1f}" fill="#91a6c4" font-size="12" font-family="Arial, sans-serif">{tick}%</text>'
        )

    for index, label in enumerate(labels):
        x = chart_left + (index / points) * chart_width
        svg_parts.append(
            f'<text x="{x:.1f}" y="{chart_top + chart_height + 34}" text-anchor="middle" fill="#d9e7ff" font-size="13" font-family="Arial, sans-serif">{escape(label)}</text>'
        )

    legend_x = 40
    for series_name, color, _ in series:
        svg_parts.append(f'<circle cx="{legend_x}" cy="88" r="6" fill="{color}"/>')
        svg_parts.append(
            f'<text x="{legend_x + 14}" y="92" fill="#dce9ff" font-size="13" font-family="Arial, sans-serif">{escape(series_name)}</text>'
        )
        legend_x += 110

    for _, color, values in series:
        path_points = []
        for index, value in enumerate(values):
            x = chart_left + (index / points) * chart_width
            y = chart_top + chart_height - (value / 100) * chart_height
            path_points.append(f"{x:.1f},{y:.1f}")
        svg_parts.append(
            f'<polyline points="{" ".join(path_points)}" fill="none" stroke="{color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'
        )
        for index, value in enumerate(values):
            x = chart_left + (index / points) * chart_width
            y = chart_top + chart_height - (value / 100) * chart_height
            svg_parts.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="5" fill="{color}"/>')
            svg_parts.append(
                f'<text x="{x:.1f}" y="{y - 12:.1f}" text-anchor="middle" fill="#f6fbff" font-size="12" font-family="Arial, sans-serif">{value:.1f}%</text>'
            )

    svg_parts.append("</svg>")
    return "".join(svg_parts)


def render_bar_chart(
    title: str,
    labels: list[str],
    values: list[float],
    color: str,
    suffix: str,
) -> str:
    width = 760
    height = 420
    chart_left = 210
    chart_top = 72
    bar_height = 52
    gap = 18
    max_value = max(values) if values else 1

    svg_parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" fill="none">',
        '<rect width="100%" height="100%" rx="28" fill="#0f1b2d"/>',
        '<rect x="20" y="20" width="720" height="380" rx="22" fill="#132641" stroke="rgba(255,255,255,0.08)"/>',
        f'<text x="40" y="52" fill="#f3f7ff" font-size="24" font-family="Arial, sans-serif" font-weight="700">{escape(title)}</text>',
    ]

    for index, (label, value) in enumerate(zip(labels, values)):
        y = chart_top + index * (bar_height + gap)
        bar_width = (value / max_value) * 430 if max_value else 0
        svg_parts.append(
            f'<text x="40" y="{y + 31}" fill="#d9e7ff" font-size="14" font-family="Arial, sans-serif">{escape(label)}</text>'
        )
        svg_parts.append(
            f'<rect x="{chart_left}" y="{y}" width="430" height="{bar_height}" rx="18" fill="rgba(255,255,255,0.08)"/>'
        )
        svg_parts.append(
            f'<rect x="{chart_left}" y="{y}" width="{bar_width:.1f}" height="{bar_height}" rx="18" fill="{color}"/>'
        )
        svg_parts.append(
            f'<text x="{chart_left + bar_width + 16:.1f}" y="{y + 32}" fill="#f6fbff" font-size="14" font-family="Arial, sans-serif">{value:.1f}{suffix}</text>'
        )

    svg_parts.append("</svg>")
    return "".join(svg_parts)


def write_charts(summary: dict[str, object]) -> None:
    cohort_rows = summary["cohort_summary"]  # type: ignore[assignment]
    segment_rows = summary["segment_summary"]  # type: ignore[assignment]
    churn_rows = summary["top_churn_events"][:4]  # type: ignore[index]

    labels = [row["install_date"][5:] for row in cohort_rows]
    cohort_svg = render_line_chart(
        title="Cohort Retention Trend",
        labels=labels,
        series=[
            ("D1", "#56c7ff", [float(row["retained_d1_pct"]) for row in cohort_rows]),
            ("D3", "#4d7cff", [float(row["retained_d3_pct"]) for row in cohort_rows]),
            ("D7", "#18365b", [float(row["retained_d7_pct"]) for row in cohort_rows]),
        ],
    )
    write_text(OUTPUT_DIR / "chart-cohort-retention.svg", cohort_svg)

    segment_svg = render_bar_chart(
        title="Segment D7 Retention",
        labels=[str(row["segment"]).replace("_", " ") for row in segment_rows],
        values=[float(row["retained_d7_pct"]) for row in segment_rows],
        color="#57c5ff",
        suffix="%",
    )
    write_text(OUTPUT_DIR / "chart-segment-d7.svg", segment_svg)

    churn_svg = render_bar_chart(
        title="Top Churn Events",
        labels=[str(row["event_type"]) for row in churn_rows],
        values=[float(row["count"]) for row in churn_rows],
        color="#4d7cff",
        suffix="x",
    )
    write_text(OUTPUT_DIR / "chart-churn-events.svg", churn_svg)


def write_outputs(summary: dict[str, object]) -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    (OUTPUT_DIR / "retention_summary.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    write_csv(
        OUTPUT_DIR / "cohort_summary.csv",
        summary["cohort_summary"],  # type: ignore[arg-type]
        ["install_date", "installs", "retained_d1_pct", "retained_d3_pct", "retained_d7_pct"],
    )
    write_csv(
        OUTPUT_DIR / "segment_summary.csv",
        summary["segment_summary"],  # type: ignore[arg-type]
        ["segment", "players", "retained_d3_pct", "retained_d7_pct"],
    )

    risk = summary["risk_signals"]  # type: ignore[assignment]
    retention = summary["retention"]  # type: ignore[assignment]
    report_lines = [
        "# Python 分析摘要",
        "",
        f"- 玩家數：{summary['player_count']}",
        f"- D1 留存：{retention['d1_pct']}%",
        f"- D3 留存：{retention['d3_pct']}%",
        f"- D7 留存：{retention['d7_pct']}%",
        f"- 到達第 8 關後流失玩家：{risk['level_8_churners']} 人 ({risk['level_8_churner_pct']}%)",
        f"- 參與活動玩家 D7 留存：{risk['event_join_d7_pct']}%",
        f"- 忽略活動玩家 D7 留存：{risk['event_ignore_d7_pct']}%",
        "",
        "## 主要觀察",
        "",
        "1. 第 8 關後流失比例偏高，代表關卡難度或補強提示值得優先檢查。",
        "2. 有參與活動的玩家 D7 留存明顯高於忽略活動的玩家，中期目標感可能是保留關鍵。",
        "3. 非付費玩家量體最大，但 D7 留存最低，適合再往下切新手低活躍族群。",
    ]
    (OUTPUT_DIR / "retention_report.md").write_text("\n".join(report_lines), encoding="utf-8")
    write_charts(summary)


def main() -> None:
    rows = load_rows()
    summary = summarize(rows)
    write_outputs(summary)
    print(f"Generated analysis outputs in: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
