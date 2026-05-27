from __future__ import annotations

import os
from pathlib import Path

import pandas as pd


BASE_DIR = Path(__file__).resolve().parents[1]
os.environ.setdefault("MPLCONFIGDIR", str(BASE_DIR / ".matplotlib"))

import matplotlib.pyplot as plt


KPI_FILE = BASE_DIR / "mock-data" / "daily_event_kpis.csv"
ECONOMY_FILE = BASE_DIR / "economy-table.csv"
OUTPUT_DIR = BASE_DIR / "outputs"


def load_data() -> tuple[pd.DataFrame, pd.DataFrame]:
    kpi_df = pd.read_csv(KPI_FILE, encoding="utf-8-sig")
    economy_df = pd.read_csv(ECONOMY_FILE, encoding="utf-8-sig")
    kpi_df["participation_rate_pct"] = (kpi_df["participants"] / kpi_df["dau"] * 100).round(1)
    kpi_df["arppu_ntd"] = (kpi_df["revenue_ntd"] / kpi_df["paying_users"]).round(1)
    return kpi_df, economy_df


def ensure_output_dir() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    (BASE_DIR / ".matplotlib").mkdir(parents=True, exist_ok=True)


def dataframe_to_markdown(frame: pd.DataFrame) -> str:
    headers = [str(column) for column in frame.columns]
    rows = [[str(value) for value in row] for row in frame.itertuples(index=False, name=None)]
    divider = ["---"] * len(headers)
    lines = [
        "| " + " | ".join(headers) + " |",
        "| " + " | ".join(divider) + " |",
    ]
    for row in rows:
        lines.append("| " + " | ".join(row) + " |")
    return "\n".join(lines)


def build_summaries(kpi_df: pd.DataFrame, economy_df: pd.DataFrame) -> dict[str, pd.DataFrame]:
    overview = pd.DataFrame(
        [
            {"metric": "days", "value": len(kpi_df)},
            {"metric": "avg_dau", "value": round(kpi_df["dau"].mean(), 1)},
            {"metric": "avg_participation_pct", "value": round(kpi_df["participation_rate_pct"].mean(), 1)},
            {"metric": "avg_returning_players", "value": round(kpi_df["returning_players"].mean(), 1)},
            {"metric": "avg_mission_completion_pct", "value": round(kpi_df["mission_completion_rate"].mean(), 1)},
            {"metric": "total_revenue_ntd", "value": int(kpi_df["revenue_ntd"].sum())},
            {"metric": "avg_arppu_ntd", "value": round(kpi_df["arppu_ntd"].mean(), 1)},
        ]
    )

    economy_summary = (
        economy_df.groupby(["item_type", "source_or_sink"], as_index=False)
        .agg(total_value=("cost_or_output", "sum"))
        .sort_values(["item_type", "source_or_sink"])
    )

    daily_view = kpi_df[
        [
            "date",
            "dau",
            "participants",
            "participation_rate_pct",
            "returning_players",
            "mission_completion_rate",
            "paying_users",
            "revenue_ntd",
            "arppu_ntd",
        ]
    ].copy()

    package_sales = kpi_df[["date", "bundle_a_sales", "bundle_b_sales"]].copy()

    return {
        "overview": overview,
        "daily_view": daily_view,
        "package_sales": package_sales,
        "economy_summary": economy_summary,
    }


def save_excel(summaries: dict[str, pd.DataFrame]) -> Path:
    output_path = OUTPUT_DIR / "liveops-analysis-pandas.xlsx"
    with pd.ExcelWriter(output_path, engine="openpyxl") as writer:
        for sheet_name, frame in summaries.items():
            frame.to_excel(writer, sheet_name=sheet_name[:31], index=False)
    return output_path


def save_participation_png(kpi_df: pd.DataFrame) -> Path:
    output_path = OUTPUT_DIR / "chart-liveops-participation-pandas.png"
    fig, ax = plt.subplots(figsize=(8.5, 4.8))
    ax.plot(kpi_df["date"], kpi_df["participation_rate_pct"], marker="o", linewidth=2.5, label="Participation Rate")
    ax.plot(kpi_df["date"], kpi_df["returning_players"], marker="o", linewidth=2.5, label="Returning Players")
    ax.set_title("Participation & Returning Players")
    ax.grid(alpha=0.25)
    ax.legend()
    fig.tight_layout()
    fig.savefig(output_path, dpi=180)
    plt.close(fig)
    return output_path


def save_revenue_png(kpi_df: pd.DataFrame) -> Path:
    output_path = OUTPUT_DIR / "chart-liveops-revenue-pandas.png"
    fig, ax = plt.subplots(figsize=(8.5, 4.8))
    ax.bar(kpi_df["date"], kpi_df["revenue_ntd"], color="#d65a2d", alpha=0.85, label="Revenue")
    ax.plot(kpi_df["date"], kpi_df["arppu_ntd"], color="#482116", marker="o", linewidth=2.2, label="ARPPU")
    ax.set_title("Revenue & ARPPU")
    ax.grid(axis="y", alpha=0.25)
    ax.legend()
    fig.tight_layout()
    fig.savefig(output_path, dpi=180)
    plt.close(fig)
    return output_path


def save_markdown_report(kpi_df: pd.DataFrame, summaries: dict[str, pd.DataFrame]) -> Path:
    overview = summaries["overview"]
    economy_summary = summaries["economy_summary"]
    overview_map = dict(zip(overview["metric"], overview["value"]))
    best_revenue_day = kpi_df.loc[kpi_df["revenue_ntd"].idxmax()]
    lowest_completion_day = kpi_df.loc[kpi_df["mission_completion_rate"].idxmin()]

    lines = [
        "# pandas Live Ops 分析摘要",
        "",
        "## KPI Overview",
        "",
        f"- 活動天數：{int(overview_map['days'])}",
        f"- 平均 DAU：{overview_map['avg_dau']}",
        f"- 平均參與率：{overview_map['avg_participation_pct']}%",
        f"- 平均回流玩家：{overview_map['avg_returning_players']}",
        f"- 平均任務完成率：{overview_map['avg_mission_completion_pct']}%",
        f"- 活動總營收：NT${int(overview_map['total_revenue_ntd'])}",
        f"- 平均 ARPPU：NT${overview_map['avg_arppu_ntd']}",
        "",
        "## Daily KPI View",
        "",
        dataframe_to_markdown(summaries["daily_view"]),
        "",
        "## Economy Summary",
        "",
        dataframe_to_markdown(economy_summary),
        "",
        "## 關鍵觀察",
        "",
        f"1. 最高營收日落在 {best_revenue_day['date']}，代表活動尾段刺激有效。",
        f"2. 最低任務完成率出現在 {lowest_completion_day['date']}，應優先檢查中段任務摩擦。",
        "3. 若要繼續拉參與率，應先從節奏與入口優化，而不是直接放大免費產出。",
    ]

    output_path = OUTPUT_DIR / "liveops_report_pandas.md"
    output_path.write_text("\n".join(lines), encoding="utf-8")
    return output_path


def main() -> None:
    ensure_output_dir()
    kpi_df, economy_df = load_data()
    summaries = build_summaries(kpi_df, economy_df)

    excel_path = save_excel(summaries)
    participation_png = save_participation_png(kpi_df)
    revenue_png = save_revenue_png(kpi_df)
    markdown_path = save_markdown_report(kpi_df, summaries)

    print(f"Generated pandas workbook: {excel_path}")
    print(f"Generated participation chart: {participation_png}")
    print(f"Generated revenue chart: {revenue_png}")
    print(f"Generated pandas report: {markdown_path}")


if __name__ == "__main__":
    main()
