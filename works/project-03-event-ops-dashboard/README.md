# Project 03｜節慶活動設計與成效追蹤儀表板

## 專案目標

做出一份帶有活動規則、獎勵經濟與 KPI 追蹤的 Live Ops 分析案例。

## 你要做出的東西

1. `event-brief.md`
   活動背景與核心玩法
2. `economy-table.csv`
   活動幣與獎勵平衡
3. `schedule.md`
   活動前中後的執行節奏
4. `mock-data/daily_event_kpis.csv`
   活動每日 KPI 假資料
5. `python/liveops_kpi_simulator.py`
   真的可執行的 Python KPI 模擬腳本
6. `python/liveops_kpi_pandas.py`
   用 pandas + matplotlib 輸出 Excel、PNG 與營運摘要
7. `analysis-report.md`
   正式報告版，把 KPI、經濟、節奏與建議整理成完整敘事
8. `dashboard-spec.md`
   上線後要看的 KPI 面板

## 最後應該長成什麼

- 一份活動設計文件
- 一張獎勵與經濟表
- 一頁 KPI 儀表板
- 一段能講清楚活動目的的專案簡述

## 現在已經補上的技術證據

- `mock-data/daily_event_kpis.csv`
  活動上線後每天會追的 DAU、參與率、回流與營收資料
- `python/liveops_kpi_simulator.py`
  會把活動 KPI 與經濟表一起讀進來，輸出營運摘要與風險訊號
- `python/liveops_kpi_pandas.py`
  用 pandas 工作流輸出 Excel、PNG 圖表與 Markdown 摘要
- `analysis-report.md`
  把問題定義、KPI 判讀、經濟檢查與營運建議整理成正式報告
- `outputs/liveops_summary.json`
  結構化 KPI 結果
- `outputs/liveops_report.md`
  可直接用於作品展示的營運摘要
- `outputs/liveops-analysis-pandas.xlsx`
  更像分析師交付物的 Excel 工作簿
- `outputs/chart-liveops-participation-pandas.png`
  pandas + matplotlib 產出的參與與回流圖
- `outputs/chart-liveops-revenue-pandas.png`
  pandas + matplotlib 產出的營收與 ARPPU 圖
- `outputs/liveops_report_pandas.md`
  pandas 工作流整理出的營運摘要

## 如何執行

```powershell
python works/project-03-event-ops-dashboard/python/liveops_kpi_simulator.py
```

```powershell
.\.venv\Scripts\python.exe works/project-03-event-ops-dashboard/python/liveops_kpi_pandas.py
```
