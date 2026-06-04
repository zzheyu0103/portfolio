# 周哲宇作品集

遊戲設計工程師 / 數據分析師

- GitHub Pages：[線上作品集](https://zzheyu0103.github.io/portfolio/)
- GitHub Repository：[zzheyu0103/portfolio](https://github.com/zzheyu0103/portfolio)
- 聯絡方式：`s09540400@gmail.com` / `0931620056`

## 關於這份作品集

這份作品集整理了我目前主打的三個方向：

- 遊戲流程與玩家體驗設計
- 數據分析與留存問題拆解
- Live Ops 活動設計與 KPI 判讀

內容分成兩個區塊：

- `site/`
  對外展示用網站與專案頁面
- `works/`
  各專案的原始文件、分析稿、腳本與輸出成果

如果是第一次查看，建議先看線上作品集，再往下看各專案摘要與原始資料。

## 快速入口

- [作品集首頁](./site/index.html)
- [Project 01｜卡牌對戰遊戲新手流程原型](./site/project1/index.html)
- [Project 02｜手遊留存異常分析](./site/project2/index.html)
- [Project 03｜節慶活動與 Live Ops 分析](./site/project3/index.html)
- [一頁式專案摘要](./PORTFOLIO_SUMMARY.md)
- [作品資料總覽](./works/README.md)

## 專案總覽

### Project 01｜卡牌對戰遊戲新手流程原型

這個專案從「新手第三天後逐漸流失」的情境出發，重新整理卡牌遊戲前七天的引導節奏、任務安排與成長回饋，並做成多頁可操作原型。

- 展示頁面：[Project 01](./site/project1/index.html)
- 專案資料：[project-01-onboarding-system](./works/project-01-onboarding-system/README.md)
- 核心內容：玩家旅程、七日任務表、線框規格、多頁流程原型

### Project 02｜手遊留存異常分析與玩家分群

這個案例以手遊 D7 留存異常下滑為背景，透過 cohort、玩家分群、關卡卡點與事件分析，整理出可執行的優化方向。

- 展示頁面：[Project 02](./site/project2/index.html)
- 專案資料：[project-02-retention-analysis](./works/project-02-retention-analysis/README.md)
- 核心內容：Python、pandas、SQL、R、圖表輸出、正式分析報告

### Project 03｜節慶活動設計與 Live Ops KPI 分析

這個案例以節慶活動為主題，整理活動玩法、獎勵經濟、任務節奏與 KPI 追蹤方式，呈現 Live Ops 與營運分析的完整思路。

- 展示頁面：[Project 03](./site/project3/index.html)
- 專案資料：[project-03-event-ops-dashboard](./works/project-03-event-ops-dashboard/README.md)
- 核心內容：活動規則、經濟表、KPI 模擬、pandas 工作簿、營運報告

## 適合誰看

- HR：先看 [一頁式專案摘要](./PORTFOLIO_SUMMARY.md)
- 用人主管：先看 [線上作品集](https://zzheyu0103.github.io/portfolio/)
- 遊戲設計職缺：優先看 [Project 01](./site/project1/index.html)
- 數據分析職缺：優先看 [Project 02](./site/project2/index.html) 與 [Project 03](./site/project3/index.html)

## 技術與交付物

- 前端展示：`HTML` / `CSS` / `JavaScript` / `Vite`
- 分析工具：`Python` / `pandas` / `matplotlib` / `SQL` / `R`
- 輸出格式：`Markdown` / `CSV` / `JSON` / `PNG` / `SVG` / `XLSX`

## 本機執行方式

1. 安裝套件

```powershell
npm install
```

2. 啟動開發環境

```powershell
npm run dev
```

3. 建置正式版本

```powershell
npm run build
```

4. 建置 GitHub Pages 版本

```powershell
npm run build:pages
```

## Repository 結構

```text
site/
  首頁與三個專案展示頁
works/
  專案文件、腳本、資料與輸出成果
.github/workflows/
  GitHub Pages 自動部署設定
```

## 補充說明

- GitHub Pages 已配置完成，推送到 `main` 後會自動部署
- 所有分析案例都已補上可執行腳本與輸出成果
- 目前主求職方向為遊戲設計工程師與數據分析相關職務
