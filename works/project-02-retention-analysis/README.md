# Project 02｜手遊留存異常分析與玩家分群提案

## 專案目標

把一個「D7 留存異常下滑」的情境，做成完整分析案例。

## 你要做出的東西

1. `analysis-brief.md`
   問題背景、分析假設與流程
2. `analysis-report.md`
   正式報告版，把問題、觀察、圖表與行動建議整理成完整敘事
3. `mock-data/player_events.csv`
   可拿來分析的假資料
4. `sql/cohort_queries.sql`
   練習用查詢
5. `python/retention_analysis.py`
   真的可執行的 Python 留存分析腳本
6. `python/retention_analysis_pandas.py`
   用 pandas + matplotlib 輸出 Excel、PNG 圖表與正式報表摘要
7. `r/retention_summary.R`
   R 版本 cohort 彙整腳本
8. `dashboard-spec.md`
   你要做的圖表和儀表板規格

## 最後應該長成什麼

- 一份 3 頁內的分析報告
- 2 到 4 張圖表
- 一頁 KPI 儀表板
- 一段可快速說明的分析邏輯

## 現在已經補上的技術證據

- `python/retention_analysis.py`
  會讀取 `mock-data/player_events.csv`，輸出 cohort、segment 與風險訊號摘要
- `analysis-report.md`
  把問題定義、分析方法、圖表解讀與行動建議整理成正式報告
- `outputs/retention_summary.json`
  Python 腳本跑完後的結構化結果
- `python/retention_analysis_pandas.py`
  用 pandas 工作流輸出 Excel、PNG 圖表與 Markdown 摘要
- `outputs/retention-analysis-pandas.xlsx`
  更像分析師實際交付物的工作簿版本
- `outputs/chart-cohort-retention-pandas.png`
  pandas + matplotlib 產出的 cohort 留存圖
- `outputs/chart-segment-d7-pandas.png`
  pandas + matplotlib 產出的分群比較圖
- `outputs/retention_report_pandas.md`
  pandas 工作流整理出的摘要報告
- `outputs/retention_report.md`
  可以直接拿來整理成分析報告的摘要
- `outputs/chart-cohort-retention.svg`
  Python 自動產出的 cohort 留存圖
- `outputs/chart-segment-d7.svg`
  Python 自動產出的分群留存圖
- `outputs/chart-churn-events.svg`
  Python 自動產出的流失事件圖
- `r/retention_summary.R`
  用 base R 寫的 cohort 彙整版本，方便投遞需要 R 的職缺時展示

## 如何執行

### Python

```powershell
python works/project-02-retention-analysis/python/retention_analysis.py
```

### Python (`pandas` 版)

```powershell
.\.venv\Scripts\python.exe works/project-02-retention-analysis/python/retention_analysis_pandas.py
```

### R

```powershell
Rscript works/project-02-retention-analysis/r/retention_summary.R
```

如果本機尚未安裝 R，先用 Python 版本展示也完全可以，因為 Python 分析流程已經能直接跑出成果。
