const retentionTrend = [
  { date: "04/08", d1: 45, d3: 32, d7: 23 },
  { date: "04/15", d1: 44, d3: 31, d7: 22 },
  { date: "04/22", d1: 44, d3: 30, d7: 21 },
  { date: "04/29", d1: 43, d3: 28, d7: 18 },
  { date: "05/06", d1: 43, d3: 26, d7: 14 },
  { date: "05/13", d1: 42, d3: 24, d7: 12 }
];

const segmentData = [
  { label: "高活躍玩家", value: 28 },
  { label: "付費玩家", value: 34 },
  { label: "非付費活躍玩家", value: 18 },
  { label: "低活躍新玩家", value: 6 }
];

const blockerData = [
  { label: "第 8 關失敗後未再登入", value: 38 },
  { label: "未參與第二天活動任務", value: 27 },
  { label: "完成新手引導但未加入公會", value: 19 },
  { label: "連續兩日未打開商店或獎勵頁", value: 16 }
];

const retentionRoot = document.querySelector("#retention-trend");
const segmentRoot = document.querySelector("#segment-list");
const blockerRoot = document.querySelector("#blocker-list");

if (retentionRoot) {
  retentionRoot.innerHTML = retentionTrend.map((row) => `
    <article class="trend-row">
      <strong>${row.date}</strong>
      <div class="trend-bars">
        <div class="meter-track"><div class="meter-fill" data-fill="${row.d1}"></div></div>
        <div class="meter-track"><div class="meter-fill-alt" data-fill="${row.d3}"></div></div>
        <div class="meter-track"><div class="meter-fill-dark" data-fill="${row.d7}"></div></div>
      </div>
    </article>
  `).join("");
}

if (segmentRoot) {
  segmentRoot.innerHTML = segmentData.map((row) => `
    <article class="segment-row">
      <div>
        <strong>${row.label}</strong>
        <p class="note-text">D7 retained users</p>
      </div>
      <div class="single-meter">
        <div class="meter-track"><div class="single-meter-fill meter-fill-alt" data-fill="${row.value}"></div></div>
        <span class="single-meter-value">${row.value}%</span>
      </div>
    </article>
  `).join("");
}

if (blockerRoot) {
  blockerRoot.innerHTML = blockerData.map((row) => `
    <article class="blocker-row">
      <div>
        <strong>${row.label}</strong>
        <p class="note-text">流失前 48 小時內最常見的負向事件</p>
      </div>
      <div class="single-meter">
        <div class="meter-track"><div class="single-meter-fill meter-fill-dark" data-fill="${row.value}"></div></div>
        <span class="single-meter-value">${row.value}%</span>
      </div>
    </article>
  `).join("");
}

requestAnimationFrame(() => {
  document.querySelectorAll("[data-fill]").forEach((element) => {
    element.style.width = `${element.getAttribute("data-fill")}%`;
  });
});
