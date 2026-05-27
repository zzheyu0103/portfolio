from __future__ import annotations

import os
from pathlib import Path

import pandas as pd


BASE_DIR = Path(__file__).resolve().parents[1]
os.environ.setdefault("MPLCONFIGDIR", str(BASE_DIR / ".matplotlib"))

import matplotlib.pyplot as plt


DATA_FILE = BASE_DIR / "mock-data" / "player_events.csv"
OUTPUT_DIR = BASE_DIR / "outputs"


def load_data() -> pd.DataFrame:
    df = pd.read_csv(DATA_FILE, encoding="utf-8-sig")
    bool_columns = ["retained_d1", "retained_d3", "retained_d7", "reached_level_8"]
    for column in bool_columns:
        df[column] = df[column].astype(str).str.lower().eq("yes")
    return df


def retention_pct(series: pd.Series) -> float:
    return round(float(series.mean() * 100), 1)


def build_summaries(df: pd.DataFrame) -> dict[str, object]:
    cohort_summary = (
        df.groupby("install_date")
        .agg(
            installs=("player_id", "count"),
            retained_d1_pct=("retained_d1", retention_pct),
            retained_d3_pct=("retained_d3", retention_pct),
            retained_d7_pct=("retained_d7", retention_pct),
        )
        .reset_index()
    )

    segment_summary = (
        df.groupby("payer_segment")
        .agg(
            players=("player_id", "count"),
            retained_d3_pct=("retained_d3", retention_pct),
            retained_d7_pct=("retained_d7", retention_pct),
        )
        .reset_index()
        .sort_values("retained_d7_pct", ascending=False)
    )

    churn_events = (
        df.loc[~df["retained_d7"]]
        .groupby("event_type")
        .size()
        .reset_index(name="count")
        .sort_values("count", ascending=False)
    )

    level_summary = (
        df.groupby("last_level")
        .agg(
            players=("player_id", "count"),
            retained_d7_pct=("retained_d7", retention_pct),
        )
        .reset_index()
        .sort_values("last_level")
    )

    overview = pd.DataFrame(
        [
            {"metric": "player_count", "value": len(df)},
            {"metric": "d1_retention_pct", "value": retention_pct(df["retained_d1"])},
            {"metric": "d3_retention_pct", "value": retention_pct(df["retained_d3"])},
            {"metric": "d7_retention_pct", "value": retention_pct(df["retained_d7"])},
            {
                "metric": "level_8_churners",
                "value": int((df["reached_level_8"] & ~df["retained_d7"]).sum()),
            },
            {
                "metric": "event_join_d7_pct",
                "value": retention_pct(df.loc[df["event_type"] == "event_join", "retained_d7"]),
            },
            {
                "metric": "event_ignore_d7_pct",
                "value": retention_pct(df.loc[df["event_type"] == "event_ignore", "retained_d7"]),
            },
        ]
    )

    return {
        "overview": overview,
        "cohort_summary": cohort_summary,
        "segment_summary": segment_summary,
        "churn_events": churn_events,
        "level_summary": level_summary,
    }


def ensure_output_dir() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    (BASE_DIR / ".matplotlib").mkdir(parents=True, exist_ok=True)


def dataframe_to_markdown(frame: pd.DataFrame) -> str:
    headers = [str(column) for column in frame.columns]
    rows = [[str(value) for value in row] for row in frame.itertuples(index=False, name=None)]
    divider = ["---"] * len(headers)
    markdown_lines = [
        "| " + " | ".join(headers) + " |",
        "| " + " | ".join(divider) + " |",
    ]
    for row in rows:
        markdown_lines.append("| " + " | ".join(row) + " |")
    return "\n".join(markdown_lines)


def save_excel(summaries: dict[str, object]) -> Path:
    output_path = OUTPUT_DIR / "retention-analysis-pandas.xlsx"
    with pd.ExcelWriter(output_path, engine="openpyxl") as writer:
        for sheet_name, frame in summaries.items():
            assert isinstance(frame, pd.DataFrame)
            frame.to_excel(writer, sheet_name=sheet_name[:31], index=False)
    return output_path


def save_cohort_png(cohort_summary: pd.DataFrame) -> Path:
    output_path = OUTPUT_DIR / "chart-cohort-retention-pandas.png"
    fig, ax = plt.subplots(figsize=(8.5, 4.8))
    ax.plot(cohort_summary["install_date"], cohort_summary["retained_d1_pct"], marker="o", linewidth=2.5, label="D1")
    ax.plot(cohort_summary["install_date"], cohort_summary["retained_d3_pct"], marker="o", linewidth=2.5, label="D3")
    ax.plot(cohort_summary["install_date"], cohort_summary["retained_d7_pct"], marker="o", linewidth=2.5, label="D7")
    ax.set_title("Cohort Retention Trend (pandas + matplotlib)")
    ax.set_ylabel("Retention %")
    ax.set_ylim(0, 105)
    ax.grid(alpha=0.25)
    ax.legend()
    fig.tight_layout()
    fig.savefig(output_path, dpi=180)
    plt.close(fig)
    return output_path


def save_segment_png(segment_summary: pd.DataFrame) -> Path:
    output_path = OUTPUT_DIR / "chart-segment-d7-pandas.png"
    fig, ax = plt.subplots(figsize=(8.5, 4.8))
    ax.bar(segment_summary["payer_segment"], segment_summary["retained_d7_pct"], color=["#173460", "#3578f6", "#57c5ff"])
    ax.set_title("Segment D7 Retention (pandas + matplotlib)")
    ax.set_ylabel("D7 Retention %")
    ax.set_ylim(0, 105)
    ax.grid(axis="y", alpha=0.25)
    fig.tight_layout()
    fig.savefig(output_path, dpi=180)
    plt.close(fig)
    return output_path


def save_markdown_report(summaries: dict[str, object]) -> Path:
    overview = summaries["overview"]
    cohort_summary = summaries["cohort_summary"]
    segment_summary = summaries["segment_summary"]
    churn_events = summaries["churn_events"]
    assert isinstance(overview, pd.DataFrame)
    assert isinstance(cohort_summary, pd.DataFrame)
    assert isinstance(segment_summary, pd.DataFrame)
    assert isinstance(churn_events, pd.DataFrame)

    overview_map = dict(zip(overview["metric"], overview["value"]))
    top_churn = churn_events.head(3)

    lines = [
        "# pandas 分析摘要",
        "",
        "## KPI Overview",
        "",
        f"- 玩家數：{int(overview_map['player_count'])}",
        f"- D1 留存：{overview_map['d1_retention_pct']}%",
        f"- D3 留存：{overview_map['d3_retention_pct']}%",
        f"- D7 留存：{overview_map['d7_retention_pct']}%",
        f"- 第 8 關後流失玩家：{int(overview_map['level_8_churners'])}",
        "",
        "## Cohort Summary",
        "",
        dataframe_to_markdown(cohort_summary),
        "",
        "## Segment Summary",
        "",
        dataframe_to_markdown(segment_summary),
        "",
        "## Top Churn Events",
        "",
        dataframe_to_markdown(top_churn),
        "",
        "## 分析結論",
        "",
        "1. 留存主要斷點落在 D3 之後，代表問題更偏向第二天後的體驗延續。",
        "2. non_payer 仍是最大量體且 D7 表現偏弱，適合做低活躍新手召回切分。",
        "3. level_fail 是最主要的流失前事件，關卡難度與補強提示應優先驗證。",
    ]

    output_path = OUTPUT_DIR / "retention_report_pandas.md"
    output_path.write_text("\n".join(lines), encoding="utf-8")
    return output_path


def main() -> None:
    ensure_output_dir()
    df = load_data()
    summaries = build_summaries(df)

    overview = summaries["overview"]
    cohort_summary = summaries["cohort_summary"]
    segment_summary = summaries["segment_summary"]
    assert isinstance(overview, pd.DataFrame)
    assert isinstance(cohort_summary, pd.DataFrame)
    assert isinstance(segment_summary, pd.DataFrame)

    excel_path = save_excel(summaries)
    cohort_png = save_cohort_png(cohort_summary)
    segment_png = save_segment_png(segment_summary)
    markdown_path = save_markdown_report(summaries)

    print(f"Generated pandas workbook: {excel_path}")
    print(f"Generated cohort chart: {cohort_png}")
    print(f"Generated segment chart: {segment_png}")
    print(f"Generated pandas report: {markdown_path}")


if __name__ == "__main__":
    main()
