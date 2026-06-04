const root = document.querySelector("#project1-prototype");

if (root) {
  const tabs = [...document.querySelectorAll(".prototype-tab")];
  const panels = [...document.querySelectorAll(".proto-screen")];
  const statusList = document.querySelector("#prototype-status");
  const missionsContainer = document.querySelector("#proto-missions");
  const deckResult = document.querySelector("#proto-deck-result");
  const rewardButton = document.querySelector('[data-action="complete"]');
  const rewardHeader = document.querySelector('[data-screen-panel="reward"] .proto-header');
  const rewardCards = document.querySelector(".proto-reward-grid");
  const rewardSecondary = document.querySelector('[data-screen-panel="reward"] .secondary-link');
  const dayRail = [...document.querySelectorAll(".proto-dayrail span")];
  const floatingToast = document.querySelector("#proto-floating-toast");

  const initialState = () => ({
    screen: "missions",
    deckApplied: false,
    battleRecovered: false,
    completed: false,
    missions: [
      {
        id: "battle",
        title: "完成 1 場對戰",
        description: "進入對戰模式，熟悉回合節奏。",
        current: 0,
        total: 1,
        reward: "金幣 x100"
      },
      {
        id: "deck",
        title: "替換 2 張卡牌",
        description: "試著調整你的第一副牌組。",
        current: 1,
        total: 2,
        reward: "功能卡 x1"
      },
      {
        id: "pack",
        title: "領取今日免費卡包",
        description: "打開卡包，看看新卡適合哪種打法。",
        current: 1,
        total: 1,
        reward: "基礎卡包 x1"
      }
    ]
  });

  let state = initialState();

  function completedCount() {
    return state.missions.filter((mission) => mission.current >= mission.total).length;
  }

  function missionStatus(mission) {
    if (mission.current >= mission.total) return "可領取";
    if (mission.current > 0) return "進行中";
    return "未完成";
  }

  function nextRecommendation() {
    if (state.completed) return "新手流程已結束，可繼續延伸到排行戰與週活動。";
    if (!state.deckApplied) return "先套用推薦牌組，讓新卡真正進入玩家成長循環。";
    if (!state.battleRecovered) return "回到對戰完成一次補強後勝場，驗證挫折引導是否有效。";
    return "今日任務已完成，可以切到完成獎勵畫面做收尾演示。";
  }

  function currentToast() {
    if (state.completed) return "新手畢業流程已完成，這段內容可以作為作品集主案例。";
    if (state.screen === "failure") return "戰敗畫面現在會把挫折轉成下一步動作，這是留存設計的關鍵。";
    if (state.screen === "deck") {
      return state.deckApplied
        ? "推薦牌組已同步，現在玩家會更容易理解新卡價值。"
        : "先把新卡和牌組關聯起來，避免抽到卡卻不知道怎麼用。";
    }
    if (state.screen === "reward") return "這個收尾畫面要負責把新手期接到長期玩法，不只是發獎勵。";
    if (!state.deckApplied) return "新手流程已就緒，先完成牌組調整吧。";
    if (!state.battleRecovered) return "補強已完成，下一步是驗證玩家是否能重新贏下一場。";
    return "今日任務已完成，切到完成獎勵頁就能演示完整收尾。";
  }

  function currentStateText() {
    if (state.completed) return "目前狀態：已完成新手七日收尾演示";
    if (!state.deckApplied) return "目前狀態：正在建立第一副牌組";
    if (!state.battleRecovered) return "目前狀態：牌組已補強，準備重新挑戰對戰";
    return "目前狀態：今日任務完成，可查看 Day 7 收尾";
  }

  function syncDayRail() {
    dayRail.forEach((item, index) => {
      item.classList.remove("is-done", "is-current");
      const day = index + 1;
      if (state.completed && day <= 7) {
        item.classList.add(day === 7 ? "is-current" : "is-done");
        return;
      }
      if (day === 1) item.classList.add("is-done");
      if (day === 2) item.classList.add("is-current");
    });
  }

  function renderMissions() {
    missionsContainer.innerHTML = "";
    state.missions.forEach((mission) => {
      const card = document.createElement("article");
      card.className = "proto-mission-card";

      const percentage = Math.min((mission.current / mission.total) * 100, 100);
      const status = missionStatus(mission);
      const chipClass = status === "可領取" ? "proto-chip is-complete" : "proto-chip";

      card.innerHTML = `
        <div class="proto-mission-title">
          <strong>${mission.title}</strong>
          <span class="${chipClass}">${status}</span>
        </div>
        <p>${mission.description}</p>
        <div class="proto-progress"><span style="width: ${percentage}%"></span></div>
        <div class="proto-mission-meta">
          <span>進度 ${mission.current} / ${mission.total}</span>
          <span>獎勵 ${mission.reward}</span>
        </div>
      `;

      missionsContainer.appendChild(card);
    });
  }

  function renderStatus() {
    const lines = [
      `Day 2 進度：${completedCount()} / 3`,
      currentStateText(),
      `推薦動作：${nextRecommendation()}`
    ];
    statusList.innerHTML = lines.map((line) => `<li>${line}</li>`).join("");
  }

  function renderDeckResult() {
    if (state.completed) {
      deckResult.textContent = "推薦牌組已成功套用，且新手流程示範已收尾。";
      return;
    }
    if (state.deckApplied) {
      deckResult.textContent = "已套用推薦牌組。現在可回到任務頁或模擬重新挑戰對戰。";
      return;
    }
    deckResult.textContent = "尚未套用。完成套用後可推進今日任務。";
  }

  function renderReward() {
    if (state.completed) {
      rewardHeader.innerHTML = `
        <p class="eyebrow">DAY 7 CLEAR</p>
        <h5>你已完成新手收尾演示</h5>
        <p>這個畫面主要呈現玩家完成七日任務後，如何被導到下一階段內容。</p>
      `;
      rewardCards.innerHTML = `
        <article class="proto-reward-card"><strong>史詩卡 x1</strong><p>玩家感受到明顯成長。</p></article>
        <article class="proto-reward-card"><strong>完成徽章</strong><p>強化新手期結束的成就感。</p></article>
        <article class="proto-reward-card"><strong>週活動入口</strong><p>把玩家接到長期留存內容。</p></article>
      `;
      rewardButton.textContent = "已完成流程";
      rewardButton.disabled = true;
      rewardSecondary.textContent = "回任務頁";
      return;
    }

    rewardHeader.innerHTML = `
      <p class="eyebrow">DAY 7 CLEAR</p>
      <h5>恭喜完成新手七日計畫</h5>
      <p>你已經具備進入正式對戰的基礎，接下來可以進入長期成長內容。</p>
    `;
    rewardCards.innerHTML = `
      <article class="proto-reward-card"><strong>史詩卡 x1</strong><p>立即提升牌組上限</p></article>
      <article class="proto-reward-card"><strong>完成徽章</strong><p>顯示在玩家個人頁</p></article>
      <article class="proto-reward-card"><strong>金幣 x500</strong><p>支援下一階段升級</p></article>
    `;
    rewardButton.textContent = state.battleRecovered ? "領取並前往週活動" : "先完成今日任務";
    rewardButton.disabled = !state.battleRecovered;
    rewardSecondary.textContent = "回新手流程";
  }

  function renderTabs() {
    tabs.forEach((tab) => {
      const active = tab.dataset.screen === state.screen;
      tab.classList.toggle("is-active", active);
    });

    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.screenPanel === state.screen);
    });
  }

  function render() {
    renderMissions();
    renderStatus();
    renderDeckResult();
    renderReward();
    renderTabs();
    syncDayRail();
    floatingToast.textContent = currentToast();
  }

  function setScreen(screen) {
    state.screen = screen;
    render();
  }

  function applyDeck() {
    state.deckApplied = true;
    state.missions = state.missions.map((mission) =>
      mission.id === "deck" ? { ...mission, current: mission.total } : mission
    );
    setScreen("deck");
  }

  function simulateRecoveredBattle() {
    if (!state.deckApplied) {
      setScreen("deck");
      return;
    }

    state.battleRecovered = true;
    state.missions = state.missions.map((mission) =>
      mission.id === "battle" ? { ...mission, current: mission.total } : mission
    );
    setScreen("missions");
  }

  function progressFlow() {
    if (!state.deckApplied) {
      applyDeck();
      return;
    }
    if (!state.battleRecovered) {
      simulateRecoveredBattle();
      return;
    }
    setScreen("reward");
  }

  function completePrototype() {
    if (!state.battleRecovered) return;
    state.completed = true;
    setScreen("reward");
  }

  function resetFlow() {
    state = initialState();
    render();
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setScreen(tab.dataset.screen));
  });

  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => setScreen(button.dataset.jump));
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const { action } = button.dataset;
      if (action === "progress") progressFlow();
      if (action === "reset") resetFlow();
      if (action === "apply-deck") applyDeck();
      if (action === "simulate-win") simulateRecoveredBattle();
      if (action === "complete") completePrototype();
    });
  });

  render();
}
