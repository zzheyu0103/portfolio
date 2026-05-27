from __future__ import annotations

import csv
import json
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[1]
KPI_FILE = BASE_DIR / "mock-data" / "daily_event_kpis.csv"
ECONOMY_FILE = BASE_DIR / "economy-table.csv"
OUTPUT_DIR = BASE_DIR / "outputs"


def load_csv(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))


def avg(values: list[float]) -> float:
    if not values:
        return 0.0
    return round(sum(values) / len(values), 1)


def summarize() -> dict[str, object]:
    daily_rows = load_csv(KPI_FILE)
    economy_rows = load_csv(ECONOMY_FILE)

    participants = [int(row["participants"]) for row in daily_rows]
    dau = [int(row["dau"]) for row in daily_rows]
    returning_players = [int(row["returning_players"]) for row in daily_rows]
    mission_completion = [float(row["mission_completion_rate"]) for row in daily_rows]
    paying_users = [int(row["paying_users"]) for row in daily_rows]
    revenue = [int(row["revenue_ntd"]) for row in daily_rows]

    source_total = 0
    sink_total = 0
    for row in economy_rows:
        value = int(row["cost_or_output"])
        if row["item_type"] == "event_currency":
            source_total += value
        elif row["source_or_sink"] == "消耗":
            sink_total += value

    best_day = max(daily_rows, key=lambda row: int(row["revenue_ntd"]))
    worst_completion_day = min(daily_rows, key=lambda row: float(row["mission_completion_rate"]))

    return {
        "source_file": str(KPI_FILE.relative_to(BASE_DIR)),
        "days": len(daily_rows),
        "avg_dau": avg(dau),
        "avg_participation_pct": round(sum(p / d for p, d in zip(participants, dau)) / len(daily_rows) * 100, 1),
        "avg_returning_players": avg(returning_players),
        "avg_mission_completion_pct": avg(mission_completion),
        "total_revenue_ntd": sum(revenue),
        "avg_arppu_ntd": round(sum(r / p for r, p in zip(revenue, paying_users)) / len(daily_rows), 1),
        "best_revenue_day": {
            "date": best_day["date"],
            "revenue_ntd": int(best_day["revenue_ntd"]),
            "participants": int(best_day["participants"]),
        },
        "lowest_completion_day": {
            "date": worst_completion_day["date"],
            "mission_completion_rate": float(worst_completion_day["mission_completion_rate"]),
        },
        "economy_balance": {
            "free_currency_output": source_total,
            "single_draw_sink": sink_total,
            "output_to_sink_ratio": round(source_total / sink_total, 2) if sink_total else 0.0,
        },
    }


def write_outputs(summary: dict[str, object]) -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUTPUT_DIR / "liveops_summary.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    lines = [
        "# Python KPI 模擬摘要",
        "",
        f"- 活動天數：{summary['days']}",
        f"- 平均 DAU：{summary['avg_dau']}",
        f"- 平均活動參與率：{summary['avg_participation_pct']}%",
        f"- 平均回流玩家：{summary['avg_returning_players']}",
        f"- 平均任務完成率：{summary['avg_mission_completion_pct']}%",
        f"- 活動總營收：NT${summary['total_revenue_ntd']}",
        f"- 平均 ARPPU：NT${summary['avg_arppu_ntd']}",
        "",
        "## 重點觀察",
        "",
        f"1. 最高營收日是 {summary['best_revenue_day']['date']}，代表活動尾段與保底提醒有明顯拉升效果。",
        f"2. 任務完成率最低落在 {summary['lowest_completion_day']['date']}，適合檢查 Day 4 任務門檻與提醒文案。",
        f"3. 免費產出 / 單次抽取消耗比為 {summary['economy_balance']['output_to_sink_ratio']}，可作為活動經濟是否過鬆的初步檢查值。",
    ]
    (OUTPUT_DIR / "liveops_report.md").write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    summary = summarize()
    write_outputs(summary)
    print(f"Generated live ops outputs in: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
