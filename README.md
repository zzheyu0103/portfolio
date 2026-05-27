# 鈊象作品集

這是一個用 `Vite` 包起來的作品集專案，現在已整理成「網站」和「作品內容」分開的結構。

## 專案結構

- `site/`
  對外展示的網站頁面
- `works/`
  作品企劃、分析稿、任務表與面試講稿
- `dist/`
  打包輸出結果

## 在 Cursor 執行

1. 安裝套件
   `npm install`
2. 啟動開發環境
   `npm run dev`
3. 打開終端顯示的本機網址，通常會是 `http://localhost:5173`

## 可編輯內容

- `site/index.html`
  作品集網站文案與頁面結構
- `site/styles.css`
  視覺風格與排版
- `site/project1/`
  主打遊戲流程 prototype
- `site/project2/`
  留存分析展示頁
- `site/project3/`
  Live Ops 活動展示頁
- `works/*.md`
  每個作品的完整內容稿

## 建議工作流

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

## 目前可直接展示的頁面

- `/`
  首頁作品集
- `/project1/index.html`
  卡牌新手流程多頁 demo
- `/project2/index.html`
  手遊留存異常分析展示頁
- `/project3/index.html`
  節慶活動企劃與 KPI 展示頁
