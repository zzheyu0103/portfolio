const schedule = [
  { label: "活動前", title: "預熱與入口準備", note: "公告預熱、入口素材、獎勵與活動幣平衡確認。" },
  { label: "Day 1", title: "主入口開啟", note: "打開每日任務、福袋抽取與第一波回流召回訊息。" },
  { label: "Day 3", title: "排行榜加碼", note: "讓高活躍玩家開始競爭，同時拉升討論度。" },
  { label: "Day 5", title: "限時任務推進", note: "補一波中段刺激，避免熱度在第三天後下滑。" },
  { label: "Day 7", title: "保底兌換提醒", note: "提醒玩家清空活動幣，強化完成感與轉換。" }
];

const economy = [
  { label: "每日任務", title: "祈福幣 +120", note: "日常參與的核心來源，保證一般玩家也能累積。" },
  { label: "福袋十連", title: "消耗 300 幣", note: "刺激短期期待感，提供高波動抽取體驗。" },
  { label: "史詩外觀", title: "保底 1,200 幣", note: "讓非課玩家也有長期目標，不會只剩抽獎。" },
  { label: "新春禮包", title: "付費轉換入口", note: "補足營收，但不應成為唯一高價值來源。" }
];

const missions = [
  { label: "Day 1", value: 81 },
  { label: "Day 2", value: 76 },
  { label: "Day 3", value: 70 },
  { label: "Day 4", value: 68 },
  { label: "Day 5", value: 73 },
  { label: "Day 6", value: 69 },
  { label: "Day 7", value: 74 }
];

const kpis = [
  { label: "DAU", title: "活動期間整體活躍", note: "先看活動是否真的把人帶回來。" },
  { label: "參與率", title: "主入口點擊與任務啟動", note: "低參與率代表入口、文案或獎勵不夠有吸引力。" },
  { label: "回流率", title: "沉默玩家返場占比", note: "這是節慶活動是否成功喚醒舊玩家的關鍵指標。" },
  { label: "完成率", title: "每日任務掉點", note: "用來判斷任務門檻與活動疲勞是否過高。" },
  { label: "轉換率", title: "禮包與福袋付費", note: "衡量價值包裝是否合理，而不是只看營收總額。" },
  { label: "ARPPU", title: "高價值玩家貢獻", note: "避免只有低價值促銷，卻沒有健康的活動收益。" }
];

const scheduleRoot = document.querySelector("#schedule-list");
const economyRoot = document.querySelector("#economy-list");
const missionRoot = document.querySelector("#mission-bars");
const kpiRoot = document.querySelector("#kpi-grid");

if (scheduleRoot) {
  scheduleRoot.innerHTML = schedule.map((item) => `
    <article class="schedule-item">
      <span class="mini-tag">${item.label}</span>
      <strong>${item.title}</strong>
      <p class="note-text">${item.note}</p>
    </article>
  `).join("");
}

if (economyRoot) {
  economyRoot.innerHTML = economy.map((item) => `
    <article class="economy-item">
      <span class="mini-label">${item.label}</span>
      <strong>${item.title}</strong>
      <p class="note-text">${item.note}</p>
    </article>
  `).join("");
}

if (missionRoot) {
  missionRoot.innerHTML = missions.map((item) => `
    <article class="mission-row">
      <div>
        <strong>${item.label}</strong>
        <p class="note-text">每日任務完成率</p>
      </div>
      <div class="single-meter">
        <div class="meter-track"><div class="single-meter-fill meter-fill-alt" data-fill="${item.value}"></div></div>
        <span class="single-meter-value">${item.value}%</span>
      </div>
    </article>
  `).join("");
}

if (kpiRoot) {
  kpiRoot.innerHTML = kpis.map((item) => `
    <article class="kpi-card">
      <strong>${item.label}</strong>
      <h4>${item.title}</h4>
      <p>${item.note}</p>
    </article>
  `).join("");
}

requestAnimationFrame(() => {
  document.querySelectorAll("[data-fill]").forEach((element) => {
    element.style.width = `${element.getAttribute("data-fill")}%`;
  });
});
