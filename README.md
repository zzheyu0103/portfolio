# 作品集

這份作品集以靜態網站方式整理，內容分成「網站展示」和「專案資料」兩個區塊，方便對外瀏覽，也方便後續持續補內容。

## 專案結構

- `site/`
  對外展示的網站頁面
- `works/`
  專案文件、分析稿、任務表與展示說明
- `dist/`
  打包輸出結果

## 本機執行

1. 安裝套件
   `npm install`
2. 啟動開發環境
   `npm run dev`
3. 打開終端顯示的本機網址，通常會是 `http://localhost:5173`

## 主要內容位置

- `site/index.html`
  首頁文案與頁面結構
- `site/styles.css`
  視覺風格與排版
- `site/project1/`
  主打的遊戲流程原型頁面
- `site/project2/`
  留存分析展示頁
- `site/project3/`
  Live Ops 活動展示頁
- `works/*.md`
  各專案的說明文件、分析稿與規格

## 建議更新方式

1. 先在 `works/` 補完整內容
2. 再把濃縮版本更新到 `site/index.html`
3. 用 `npm run dev` 預覽網站
4. 用 `npm run build` 確認輸出正常

## GitHub Pages 部署

### 本機建置 GitHub Pages 版本

```powershell
npm run build:pages
```

建完後會產生：

- `dist-pages/`
  可直接部署到 GitHub Pages 的靜態網站版本

### GitHub 上線方式

1. 把專案推到 GitHub Repository
2. 預設分支使用 `main`
3. 到 `Settings > Pages`
4. `Build and deployment` 選擇 `GitHub Actions`
5. 之後只要 push 到 `main`，就會自動部署

### 已補好的部署檔

- `.github/workflows/deploy-pages.yml`
  GitHub Pages 自動部署設定
- `package.json`
  已補 `build:pages`
- `site/vite.config.js`
  已補 GitHub Pages 相對路徑模式

## 目前可直接查看的頁面

- `/`
  首頁作品集
- `/project1/index.html`
  卡牌新手流程多頁展示
- `/project2/index.html`
  手遊留存異常分析展示頁
- `/project3/index.html`
  節慶活動設計與 KPI 展示頁
