const STORAGE_KEY = "igs-project1-state";
const FLASH_KEY = "igs-project1-flash";

const IS_FILE_PROTOCOL = window.location.protocol === "file:";
const IS_DIST_FILE = IS_FILE_PROTOCOL && /[\\/]dist[\\/]/.test(window.location.pathname);
const PROJECT1_BASE = IS_FILE_PROTOCOL ? "./" : "/project1/";
const PORTFOLIO_BASE = IS_FILE_PROTOCOL ? "../index.html" : "/";
const ASSET_BASE = IS_FILE_PROTOCOL
  ? (IS_DIST_FILE ? "../project1-assets/" : "../public/project1-assets/")
  : "/project1-assets/";

function projectPage(path) {
  return `${PROJECT1_BASE}${path}`;
}

function assetPath(name) {
  return `${ASSET_BASE}${name}`;
}

function normalizePageHref(href) {
  if (!href) return href;
  if (href.startsWith("/project1/")) {
    return projectPage(href.replace("/project1/", ""));
  }
  if (href === "/") {
    return PORTFOLIO_BASE;
  }
  return href;
}

const ICONS = {
  gold: assetPath("icon-gold.svg"),
  gem: assetPath("icon-gem.svg"),
  energy: assetPath("icon-energy.svg")
};

const DAY_VISUALS = {
  1: { cardArt: assetPath("card-day1-initiate.svg"), icon: assetPath("icon-day1-initiate.svg"), badge: "INITIATE", progressEffect: "dawn", completionEffect: "sunrise" },
  2: { cardArt: assetPath("card-day2-guardian.svg"), icon: assetPath("icon-day2-guardian.svg"), badge: "SYNC", progressEffect: "ember", completionEffect: "aegis" },
  3: { cardArt: assetPath("card-day3-upgrade.svg"), icon: assetPath("icon-day3-upgrade.svg"), badge: "UPGRADE", progressEffect: "growth", completionEffect: "ascend" },
  4: { cardArt: assetPath("card-day4-wind.svg"), icon: assetPath("icon-day4-wind.svg"), badge: "TACTIC", progressEffect: "gust", completionEffect: "cyclone" },
  5: { cardArt: assetPath("card-day5-gift.svg"), icon: assetPath("icon-day5-gift.svg"), badge: "LOGIN", progressEffect: "gift", completionEffect: "festival" },
  6: { cardArt: assetPath("card-day6-rank.svg"), icon: assetPath("icon-day6-rank.svg"), badge: "RANK", progressEffect: "rank", completionEffect: "impact" },
  7: { cardArt: assetPath("card-day7-legend.svg"), icon: assetPath("icon-day7-legend.svg"), badge: "LEGEND", progressEffect: "legend", completionEffect: "crown" }
};

const DAY_META = {
  1: {
    chapter: "Boot Sequence",
    rank: "Cadet I",
    arena: "Sunrise Annex",
    notice: "首日流程先讓玩家建立「我真的會玩」的感覺，再導去首次抽卡。",
    battleLabel: "Tutorial Clear",
    battleScore: "3 / 0",
    deckChoices: ["穩定起步流", "技能試玩流", "收藏導向流"],
    liveOps: "新手教學場",
    featuredMode: "新手引導",
    enemyName: "訓練用守門員",
    bannerTitle: "第一天要先讓玩家會玩",
    bannerText: "所有頁面都圍繞教學戰、技能施放與首次抽卡，不讓重點分散。",
    sealLabel: "INITIATE PASS"
  },
  2: {
    chapter: "First Build",
    rank: "Cadet II",
    arena: "Bastion Dock",
    notice: "戰敗後立刻導回推薦牌組，讓補強感比挫折更先被記住。",
    battleLabel: "Recovery Route",
    battleScore: "1 / 2",
    deckChoices: ["穩定推進流", "前排守護流", "低壓補強流"],
    liveOps: "補強再戰",
    featuredMode: "補強迴圈",
    enemyName: "堡壘試煉隊",
    bannerTitle: "挫折要被翻成補強動作",
    bannerText: "Day 2 的價值在於把輸局轉成推薦牌組與再戰驗證，而不是讓玩家卡住。",
    sealLabel: "SYNC ROUTE"
  },
  3: {
    chapter: "Growth Check",
    rank: "Bronze Wing",
    arena: "Forge Atrium",
    notice: "把升級後的成長感，直接對映成更穩定的一場勝利。",
    battleLabel: "Growth Win",
    battleScore: "1 / 0",
    deckChoices: ["成長驗證流", "護盾升級流", "中期穩場流"],
    liveOps: "升級驗證",
    featuredMode: "成長驗證",
    enemyName: "鍛造場守衛",
    bannerTitle: "升級後要讓勝利更穩",
    bannerText: "這一天最重要的是把成長感轉成一場玩家真的能感受到的勝利。",
    sealLabel: "GROWTH CHECK"
  },
  4: {
    chapter: "Tactic Drift",
    rank: "Bronze Wing+",
    arena: "Gale Forum",
    notice: "屬性與戰術只教一個今天最需要知道的克制，避免資訊爆量。",
    battleLabel: "Tactic Drill",
    battleScore: "2 / 1",
    deckChoices: ["屬性壓制流", "風場牽引流", "短回合提示流"],
    liveOps: "策略演練",
    featuredMode: "戰術教學",
    enemyName: "風場實驗隊",
    bannerTitle: "Day 4 開始講為什麼這樣玩",
    bannerText: "屬性克制與戰術提示被做成小節點，讓玩家開始理解策略差異而不覺得太重。",
    sealLabel: "TACTIC DRIFT"
  },
  5: {
    chapter: "Return Rhythm",
    rank: "Silver Gate",
    arena: "Festival Plaza",
    notice: "把登入、禮物與每日回訪節奏包成一個很輕的高頻正回饋。",
    battleLabel: "Login Loop",
    battleScore: "5 日連續",
    deckChoices: ["每日回訪流", "登入禮包流", "低壓任務流"],
    liveOps: "回流節奏",
    featuredMode: "登入活動",
    enemyName: "節慶活動使者",
    bannerTitle: "Day 5 像一個活動節點",
    bannerText: "登入、禮包與任務節奏被打包成輕量高頻回饋，目的是讓玩家願意每天回來一下。",
    sealLabel: "RETURN RHYTHM"
  },
  6: {
    chapter: "Rank Probe",
    rank: "Silver Crest",
    arena: "Arena Ladder",
    notice: "第一次碰排名戰時，重點是讓玩家願意再打一場，而不是先被壓力擊退。",
    battleLabel: "Rank Review",
    battleScore: "MR 1040",
    deckChoices: ["穩定排名流", "保護券護航流", "戰報修正流"],
    liveOps: "競技試水溫",
    featuredMode: "排名戰",
    enemyName: "天梯試探者",
    bannerTitle: "Day 6 要像第一次進競技",
    bannerText: "這一天的頁面要提供保護與戰報，讓玩家第一次碰排名時是被接住的。",
    sealLabel: "RANK PROBE"
  },
  7: {
    chapter: "Graduation Gate",
    rank: "Gold Crest",
    arena: "Crown Hall",
    notice: "最後一天不是收掉內容，而是把玩家送進排行戰、週活動與公會。",
    battleLabel: "Graduate Check",
    battleScore: "7 / 7",
    deckChoices: ["守護穩推流", "爆發進攻流", "控制拖延流"],
    liveOps: "畢業導流",
    featuredMode: "新手畢業",
    enemyName: "星耀審核官",
    bannerTitle: "Day 7 要像真正的畢業門口",
    bannerText: "不是只給一個獎勵頁，而是把玩家導到週活動、排行戰與公會，完成 onboarding 銜接。",
    sealLabel: "GRADUATION GATE"
  }
};

const DAY_CONFIG = {
  1: {
    day: 1,
    goal: "理解對戰基礎",
    tomorrowUnlock: "第一副牌組與推薦卡同步",
    summary: "先讓玩家真的學會核心對戰，再建立明天還要回來的理由。",
    pageNames: {
      home: "新手流程首頁",
      lobby: "新手大廳",
      missions: "新手七日任務",
      battle: "教學對戰回顧",
      deck: "首次卡包同步",
      completion: "Day 1 完成獎勵"
    },
    player: {
      title: "見習牌手 Alya",
      subtitle: "Day 1｜完成教學後首次正式登入",
      resources: [
        { icon: "gold", text: "金幣 640" },
        { icon: "gem", text: "鑽石 60" },
        { icon: "energy", text: "體力 14 / 20" }
      ]
    },
    home: {
      eyebrow: "DAY 1 ENTRY",
      title: "先讓玩家在第一天真的會玩，再開始養成回訪理由。",
      text: "Day 1 的重點不是給很多系統，而是讓玩家完成教學戰、第一次施放技能與第一次抽卡，建立最基礎的理解與小小成就感。",
      actions: [
        { eyebrow: "STEP 01", title: "教學戰", text: "只教勝利條件、基本出牌與節奏，不一次塞滿規則。" },
        { eyebrow: "STEP 02", title: "技能與抽卡", text: "讓玩家第一次感受到操作變化與收集刺激。" },
        { eyebrow: "STEP 03", title: "明日預告", text: "明確告訴玩家明天會開始碰到牌組與新卡同步。" }
      ]
    },
    lobby: {
      sceneLabel: "Day 1 回流入口",
      strong: "今天先完成教學戰與首次抽卡，玩家就會知道自己不是只在看說明。",
      text: "大廳在第一天的角色是收斂焦點。它要清楚告訴玩家：現在只要完成三件事，就能拿到第一個回饋並看到明天的新內容。",
      header: "讓玩家知道 Day 1 的目標只有一個：學會核心循環。",
      primaryLabel: "前往任務頁",
      primaryHref: "/project1/missions.html",
      secondaryLabel: "查看首次卡包",
      secondaryHref: "/project1/deck-builder.html",
      stats: [
        { label: "今日目標", value: "完成教學循環", description: "教學戰、英雄技能與首次抽卡三個節點。" },
        { label: "設計意圖", value: "降低資訊壓力", description: "只講最基本規則，避免第一天就失焦。" },
        { label: "明日預告", value: "牌組同步", description: "先埋下「抽到卡會怎麼變強」的期待。" },
        { label: "下一步", value: "開始 Day 1 任務", description: "先進任務頁看今天的三項最小目標。" }
      ]
    },
    missionPage: {
      playerStrong: "Day 1 任務進行中",
      playerText: "完成今天的三個小目標後，明天會解鎖第一副牌組與推薦卡同步。",
      resources: [
        { icon: "gold", text: "金幣 640" },
        { icon: "gem", text: "新手卡包待領" },
        { icon: "energy", text: "任務點數 40" }
      ],
      sceneLabel: "Day 1 任務總覽",
      strong: "今天只要學會操作、施放技能並領到第一包卡，玩家就會開始期待明天。",
      text: "這一頁的任務設計刻意很小，讓新手能在短時間內完成，避免第一天就覺得壓力太高。",
      header: "Day 1 今日任務",
      primaryLabel: "前往教學對戰",
      primaryHref: "/project1/battle-result.html",
      secondaryLabel: "查看首次卡包",
      secondaryHref: "/project1/deck-builder.html",
      highlights: [
        { eyebrow: "DAY 2 預告", title: "推薦牌組與新卡用途", text: "明天登入後會開始理解新卡如何進入你的第一副牌組。" },
        { eyebrow: "設計重點", title: "先建立小成就感", text: "每一項任務都能在短時間完成，降低新手流失。" },
        { eyebrow: "下一步", title: "去教學對戰頁", text: "完成第一場教學戰與技能施放，建立玩法基礎。" }
      ]
    },
    battle: {
      playerStrong: "教學戰流程",
      playerText: "第一天的戰鬥頁不強調挫折，而是幫玩家把規則和操作連起來。",
      resources: [
        { icon: "energy", text: "教學戰 1 場" },
        { icon: "gem", text: "技能施放 1 次" },
        { icon: "gold", text: "完成可得 100 金幣" }
      ],
      sceneLabel: "Day 1 教學戰",
      strong: "玩家第一次正式操作時，要清楚感受到自己做對了什麼。",
      text: "教學戰不該只是按下一步，而是要讓玩家知道勝利條件、基本節奏與英雄技能的存在意義。",
      header: "第一次正式對戰",
      primaryLabel: "模擬完成教學戰",
      primaryAction: "battle",
      secondaryLabel: "回任務頁",
      secondaryHref: "/project1/missions.html",
      cards: [
        { eyebrow: "教學目標", title: "理解勝利條件", text: "讓玩家知道何時攻擊、何時保留資源。" },
        { eyebrow: "教學目標", title: "使用一次英雄技能", text: "讓技能不是裝飾，而是回合節奏的一部分。" },
        { eyebrow: "設計重點", title: "打完就有回饋", text: "第一場教學戰完成後，要立刻接獎勵與抽卡。" }
      ],
      steps: [
        "1. 完成教學對戰，理解勝利條件",
        "2. 在過程中施放一次英雄技能",
        "3. 回任務頁確認 Day 1 已經推進"
      ],
      actionMissionIds: ["tutorial_battle", "hero_skill"]
    },
    deck: {
      playerStrong: "首次卡包同步",
      playerText: "第一天的組牌頁不講複雜搭配，而是讓玩家知道抽到的卡會真的被用到。",
      resources: [
        { icon: "energy", text: "類型 基礎" },
        { icon: "gem", text: "稀有 普通" },
        { icon: "gold", text: "用途 建立收藏感" }
      ],
      sceneLabel: "首次卡包",
      strong: "先讓玩家領到第一包卡，再種下「之後卡片能改變打法」的期待。",
      text: "這一頁在 Day 1 的目的不是組出強牌，而是把首次抽卡的獎勵感和收藏感建立起來。",
      header: "開啟首次卡包",
      primaryLabel: "領取卡包並完成同步",
      primaryAction: "deck",
      secondaryLabel: "回任務頁",
      secondaryHref: "/project1/missions.html",
      deckName: "新手起步包",
      deckDescription: "讓玩家先認識常用卡與卡片定位，不急著進入深度策略。",
      featuredCard: { name: "晨光見習兵", role: "前排 / 基礎 / 普通", rarity: "NEW", asset: "/project1-assets/art-guardian-card.svg" },
      replaceNote: "Day 1 著重在「拿到卡」與「知道卡有用途」，還不強求牌組深度。",
      slots: [
        { name: "晨光見習兵", role: "前排站場", highlight: true },
        { name: "基礎射手", role: "後排輸出" },
        { name: "火苗法師", role: "初階法術" },
        { name: "護盾學徒", role: "保護前排" },
        { name: "新手補師", role: "續戰支援" },
        { name: "見習指揮", role: "增益效果" },
        { name: "速攻兵", role: "搶節奏" },
        { name: "訓練裝置", role: "練習解場" }
      ],
      statusPending: "尚未領取首次卡包。完成後會把 Day 1 的新手循環收起來。",
      statusDone: "首次卡包已同步，玩家已經開始理解收集與戰力的連結。",
      actionMissionIds: ["first_draw"]
    },
    completion: {
      playerStrong: "Day 1 完成獎勵",
      playerText: "今天收尾的重點是讓玩家知道：明天回來會看到更進一步的內容。",
      resources: [
        { icon: "gem", text: "新手卡包 x1" },
        { icon: "energy", text: "Day 2 解鎖" },
        { icon: "gold", text: "金幣 x100" }
      ],
      sceneLabel: "Day 1 Clear",
      strong: "第一天的完成感要小而明確，重點是把玩家送進 Day 2 的期待。",
      text: "如果玩家打完 Day 1 不知道明天還有什麼，就很容易在第二天失去回來的動力。",
      lockTitle: "完成 Day 1 三項任務後解鎖",
      lockText: "先完成教學戰、技能施放與首次卡包，再來領取 Day 1 收尾獎勵。",
      header: "Day 1 完成獎勵",
      claimLabel: "領取 Day 1 獎勵並前往 Day 2",
      rewards: [
        { title: "新手卡包 x1", text: "強化首次完成感並補收藏刺激。", epic: true },
        { title: "金幣 x100", text: "支援 Day 2 的牌組調整與小幅成長。" },
        { title: "Day 2 解鎖", text: "明天會開始看到推薦牌組與新卡用途。" }
      ],
      routes: [
        { label: "明日重點", value: "建立第一副牌組", text: "開始理解新卡不只是收藏，而是戰力成長。" },
        { label: "玩家情緒", value: "我學會了", text: "收尾要讓玩家對明天保持正向期待。" },
        { label: "系統功能", value: "推薦牌組", text: "Day 2 會正式把卡片與牌組連起來。" },
        { label: "設計意圖", value: "明天再回來", text: "今天的結尾要自然引導下一次登入。" }
      ]
    },
    missions: [
      { id: "tutorial_battle", title: "完成教學戰", description: "打完第一場教學對戰，理解勝利條件。", total: 1, reward: "金幣 x60", ctaLabel: "完成教學戰" },
      { id: "hero_skill", title: "使用一次英雄技能", description: "感受技能對節奏的影響。", total: 1, reward: "技能教學解鎖", ctaLabel: "施放技能" },
      { id: "first_draw", title: "完成首次抽卡", description: "領取第一包卡，建立收藏期待。", total: 1, reward: "新手卡包 x1", ctaLabel: "開啟卡包" }
    ]
  },
  2: {
    day: 2,
    goal: "建立第一副牌組",
    tomorrowUnlock: "卡牌升級與進階獎勵",
    summary: "把抽卡結果轉成戰力提升，讓玩家知道自己不是白抽。",
    pageNames: {
      home: "新手流程首頁",
      lobby: "新手大廳",
      missions: "新手七日任務",
      battle: "對戰結果頁",
      deck: "推薦牌組頁",
      completion: "Day 2 完成獎勵"
    },
    player: {
      title: "見習牌手 Alya",
      subtitle: "Day 2｜開始建立第一副牌組",
      resources: [
        { icon: "gold", text: "金幣 1,240" },
        { icon: "gem", text: "鑽石 120" },
        { icon: "energy", text: "體力 12 / 20" }
      ]
    },
    home: {
      eyebrow: "DAY 2 ENTRY",
      title: "今天的核心不是抽到新卡，而是知道這張卡怎麼讓你變強。",
      text: "Day 2 開始把抽卡、組牌與戰鬥驗證串起來。玩家不只要拿到卡，還要理解推薦牌組與補強回饋。",
      actions: [
        { eyebrow: "STEP 01", title: "任務頁", text: "告訴玩家今天只要做三件事，就能完成第一副牌組。" },
        { eyebrow: "STEP 02", title: "輸局補強", text: "戰敗後不是結束，而是引導玩家去補強與再戰。" },
        { eyebrow: "STEP 03", title: "完成收尾", text: "Day 2 做完後，明天會解鎖卡牌升級與成長感。" }
      ]
    },
    lobby: {
      sceneLabel: "新手大廳",
      strong: "今天的目標是完成第一副牌組，並驗證補強後能重新獲勝。",
      text: "大廳是回流中心，所以要把任務、牌組同步、成長目標和下一步放在同一個節點。",
      header: "這裡是新手每天回來時最先看到的地方",
      primaryLabel: "前往任務頁",
      primaryHref: "/project1/missions.html",
      secondaryLabel: "查看組牌頁",
      secondaryHref: "/project1/deck-builder.html",
      stats: [
        { label: "今日任務", value: "建立第一副牌組", description: "從抽卡結果一路走到補強與再戰。" },
        { label: "設計重點", value: "把新卡接進牌組", description: "讓玩家感受到抽卡與戰力提升之間的連結。" },
        { label: "明日預告", value: "卡牌升級", description: "Day 3 會開始建立真正的成長感。" },
        { label: "下一步", value: "先去任務頁", description: "從今天的三項核心任務開始推進。" }
      ]
    },
    missionPage: {
      playerStrong: "Day 2 任務進行中",
      playerText: "完成今天的流程後，明天會解鎖卡牌升級系統。",
      resources: [
        { icon: "gold", text: "金幣 1,240" },
        { icon: "gem", text: "卡包 3" },
        { icon: "energy", text: "任務點數 80" }
      ],
      sceneLabel: "Day 2 任務總覽",
      strong: "今天的主線是組牌補強，再用一次對戰驗證改善是否有效。",
      text: "這頁的目標不是塞滿任務，而是讓玩家清楚知道今天該完成哪三件事，以及完成後會得到什麼。",
      header: "Day 2 今日任務",
      primaryLabel: "前往對戰結果頁",
      primaryHref: "/project1/battle-result.html",
      secondaryLabel: "先去組牌頁",
      secondaryHref: "/project1/deck-builder.html",
      highlights: [
        { eyebrow: "DAY 3 預告", title: "卡牌升級與進階獎勵", text: "明天登入將開啟卡牌升級教學，並送雙倍經驗 1 小時。" },
        { eyebrow: "設計重點", title: "一天只教一件事", text: "玩家今天只需要理解組牌補強與再戰驗證，不會一次塞太多概念。" },
        { eyebrow: "下一步", title: "去對戰結果頁", text: "那一頁會展示玩家輸掉後，如何被引導到補強與重新嘗試。" }
      ]
    },
    battle: {
      playerStrong: "第 5 回合崩盤",
      playerText: "這頁的作用不是責怪玩家，而是把挫折導回系統循環。",
      resources: [
        { icon: "energy", text: "連敗 2 場" },
        { icon: "gem", text: "牌組同步待確認" },
        { icon: "gold", text: "補強任務可領 80 金幣" }
      ],
      sceneLabel: "戰敗不是終點",
      strong: "玩家在第 5 回合後手牌銜接斷掉，前排厚度不足。",
      text: "這頁要把「我輸了」轉成「我知道接下來該怎麼補強」，所以重點是原因摘要、補強方向與下一步 CTA。",
      header: "輸局後的引導設計",
      primaryLabel: "模擬補強後再戰成功",
      primaryAction: "battle",
      secondaryLabel: "去組牌頁",
      secondaryHref: "/project1/deck-builder.html",
      cards: [
        { eyebrow: "可能原因", title: "前排站場不足", text: "你目前的牌組缺少穩定撐住前期的卡牌，導致第 4 到第 5 回合被壓穿。" },
        { eyebrow: "可能原因", title: "英雄技能施放偏早", text: "資源提前用完，導致後續沒有辦法穩定接牌。" },
        { eyebrow: "任務引導", title: "完成補強任務", text: "只要同步推薦牌組，就可完成補強任務並回到主線。" }
      ],
      steps: [
        "1. 前往組牌頁，把守護者艾爾加入牌組",
        "2. 回到這頁，模擬補強後重新獲勝",
        "3. 返回任務頁，確認今日三項任務皆已完成"
      ],
      actionMissionIds: ["battle_twice"]
    },
    deck: {
      playerStrong: "守護者艾爾",
      playerText: "這張卡是你前期補強的關鍵，會直接提高前排生存。",
      resources: [
        { icon: "energy", text: "類型 前排" },
        { icon: "gem", text: "稀有 稀有" },
        { icon: "gold", text: "角色 防守" }
      ],
      sceneLabel: "卡庫同步",
      strong: "把新卡和推薦牌組連起來，玩家才會理解抽卡價值。",
      text: "這頁的重點不是牌組複雜度，而是快速把「抽到的新卡」轉成「現在就能更強」的感覺。",
      header: "穩定推進流",
      primaryLabel: "套用推薦牌組",
      primaryAction: "deck",
      secondaryLabel: "回任務頁",
      secondaryHref: "/project1/missions.html",
      deckName: "穩定推進流",
      deckDescription: "前中期站場更穩定，讓新手不會太快崩盤。",
      featuredCard: { name: "守護者艾爾", role: "前排 / 防守 / 稀有", rarity: "RARE", asset: "/project1-assets/art-guardian-card.svg" },
      replaceNote: "移除見習槍兵，加入守護者艾爾，可提高前排生存並減少第 4 回合崩盤機率。",
      slots: [
        { name: "先鋒兵", role: "前排站場" },
        { name: "守護者艾爾", role: "前排防守", highlight: true },
        { name: "補師", role: "續戰支援" },
        { name: "遠程射手", role: "後排輸出" },
        { name: "火焰法師", role: "範圍解場" },
        { name: "護盾裝置", role: "拖延節奏" },
        { name: "爆裂投手", role: "中期爆發" },
        { name: "指揮官", role: "增益控制" }
      ],
      statusPending: "尚未套用推薦牌組。同步後會自動完成 Day 2 的組牌任務。",
      statusDone: "推薦牌組已同步，現在可回對戰頁驗證補強效果。",
      actionMissionIds: ["edit_deck", "swap_two_cards"]
    },
    completion: {
      playerStrong: "Day 2 完成獎勵",
      playerText: "今天的收尾要讓玩家知道：我不只是抽到卡，我真的變強了。",
      resources: [
        { icon: "gem", text: "功能卡 x1" },
        { icon: "energy", text: "Day 3 解鎖" },
        { icon: "gold", text: "金幣 x180" }
      ],
      sceneLabel: "Day 2 Clear",
      strong: "完成第一副牌組後，玩家會更願意迎接 Day 3 的成長線。",
      text: "這頁負責把 Day 2 的補強成就感收起來，並往卡牌升級與成長體驗延伸。",
      lockTitle: "完成 Day 2 三項任務後解鎖",
      lockText: "請先完成編輯牌組、替換 2 張卡與兩場對戰，再來領取 Day 2 獎勵。",
      header: "Day 2 完成獎勵",
      claimLabel: "領取 Day 2 獎勵並前往 Day 3",
      rewards: [
        { title: "指定功能卡", text: "延續 Day 2 的組牌體驗，強化新卡價值。", epic: true },
        { title: "金幣 x180", text: "支援 Day 3 的升級與成長感。" },
        { title: "卡牌升級解鎖", text: "開始建立變強是可被看見的感受。" }
      ],
      routes: [
        { label: "明日重點", value: "卡牌升級", text: "讓玩家開始感受到數值成長與戰力提升。" },
        { label: "玩家情緒", value: "我變強了", text: "Day 2 完成後要感受到補強確實有效。" },
        { label: "系統功能", value: "升級教學", text: "把前兩天的牌組理解接到下一步成長。" },
        { label: "設計意圖", value: "建立成長感", text: "避免玩家只會抽卡，卻感受不到變強。" }
      ]
    },
    missions: [
      { id: "edit_deck", title: "編輯一次牌組", description: "進入推薦牌組頁，理解組牌介面。", total: 1, reward: "金幣 x50", ctaLabel: "打開組牌頁" },
      { id: "swap_two_cards", title: "替換 2 張卡牌", description: "把新拿到的卡片正式放進牌組。", total: 2, reward: "功能卡 x1", ctaLabel: "同步推薦牌組" },
      { id: "battle_twice", title: "進行 2 場對戰", description: "補強後再戰，驗證調整是否有效。", total: 2, reward: "推薦牌組頁解鎖", ctaLabel: "模擬完成對戰" }
    ]
  },
  3: {
    day: 3,
    goal: "感受升級成長",
    tomorrowUnlock: "屬性克制與戰術提示",
    summary: "從組牌進一步走到升級，讓玩家開始感受到戰力曲線不是假的。",
    pageNames: {
      home: "新手流程首頁",
      lobby: "新手大廳",
      missions: "新手七日任務",
      battle: "勝利驗證頁",
      deck: "卡牌升級頁",
      completion: "Day 3 完成獎勵"
    },
    player: {
      title: "進階學員 Alya",
      subtitle: "Day 3｜開始感受數值成長",
      resources: [
        { icon: "gold", text: "金幣 1,540" },
        { icon: "gem", text: "強化素材 12" },
        { icon: "energy", text: "體力 11 / 20" }
      ]
    },
    home: {
      eyebrow: "DAY 3 ENTRY",
      title: "讓玩家感覺自己真的變強，才會願意開始建立中期目標。",
      text: "Day 3 的重點是把升級、勝利與每日任務串成一條小成長線，讓玩家第一次感受到長線回報。",
      actions: [
        { eyebrow: "STEP 01", title: "升級一張卡", text: "把前兩天拿到的牌組核心往上推，讓成長可見。" },
        { eyebrow: "STEP 02", title: "拿下一場勝利", text: "讓升級不是只看數值，而是能在對戰裡反映出來。" },
        { eyebrow: "STEP 03", title: "明日策略教學", text: "Day 4 會開始理解屬性克制與戰術差異。" }
      ]
    },
    lobby: {
      sceneLabel: "Day 3 成長中心",
      strong: "今天的重點是升級一張核心卡，再用勝利證明升級真的有效。",
      text: "大廳要把升級素材、今日任務與下一場勝利綁在一起，讓玩家開始認識中期成長節奏。",
      header: "Day 3 不是新功能堆疊，而是第一次建立成長感。",
      primaryLabel: "前往任務頁",
      primaryHref: "/project1/missions.html",
      secondaryLabel: "前往升級頁",
      secondaryHref: "/project1/deck-builder.html",
      stats: [
        { label: "今日目標", value: "升級 + 勝利", description: "升級一張核心卡，再拿下一場正式勝利。" },
        { label: "成長資源", value: "素材 12", description: "讓玩家知道今天的獎勵會直接用在升級。" },
        { label: "明日預告", value: "屬性克制", description: "開始理解策略差異，而不只看數值。" },
        { label: "下一步", value: "打開任務頁", description: "從升級任務開始推進 Day 3。" }
      ]
    },
    missionPage: {
      playerStrong: "Day 3 任務進行中",
      playerText: "今天的目標是把升級和一場勝利連起來，讓玩家第一次感覺到成長。",
      resources: [
        { icon: "gold", text: "金幣 1,540" },
        { icon: "gem", text: "雙倍經驗待領" },
        { icon: "energy", text: "強化素材 12" }
      ],
      sceneLabel: "Day 3 任務總覽",
      strong: "升級一張卡、完成日任、取得一場勝利，這三步會把玩家帶進中期成長。",
      text: "這一天的設計目標是把前兩天的理解變成具體成長，不讓玩家只停在抽卡與任務表層。",
      header: "Day 3 今日任務",
      primaryLabel: "前往勝利驗證頁",
      primaryHref: "/project1/battle-result.html",
      secondaryLabel: "先去升級頁",
      secondaryHref: "/project1/deck-builder.html",
      highlights: [
        { eyebrow: "DAY 4 預告", title: "屬性克制與策略提示", text: "明天會開始理解不同卡組與屬性的差異。" },
        { eyebrow: "設計重點", title: "成長要被看見", text: "升級不是數字加一，而是要轉成實際對戰結果。" },
        { eyebrow: "下一步", title: "去升級頁", text: "先把核心卡升級，再回來驗證今天的勝利。" }
      ]
    },
    battle: {
      playerStrong: "勝利驗證",
      playerText: "這頁的重點是讓玩家把升級後的成長感，實際對映到一場更穩定的勝利。",
      resources: [
        { icon: "energy", text: "勝場 1 / 1" },
        { icon: "gem", text: "升級效果已套用" },
        { icon: "gold", text: "勝利可領雙倍經驗" }
      ],
      sceneLabel: "Day 3 勝利驗證",
      strong: "玩家升級核心卡後，終於能在中期回合穩定接牌並拿下一勝。",
      text: "這頁比 Day 2 更重要，因為它負責告訴玩家：升級不是只是裝飾，是真的會改變戰鬥體驗。",
      header: "成長後的第一場勝利",
      primaryLabel: "模擬取得一場勝利",
      primaryAction: "battle",
      secondaryLabel: "回任務頁",
      secondaryHref: "/project1/missions.html",
      cards: [
        { eyebrow: "勝利原因", title: "核心卡生存更穩定", text: "升級後前排能撐到中期，讓手牌循環更完整。" },
        { eyebrow: "勝利原因", title: "日任引導很清楚", text: "玩家知道今天只要先升級，再去打一場就好。" },
        { eyebrow: "設計重點", title: "把成長感做實", text: "今天的勝利要讓玩家感覺自己真的往前走了一步。" }
      ],
      steps: [
        "1. 先到升級頁完成核心卡升級",
        "2. 回到這頁模擬取得第一場正式勝利",
        "3. 回任務頁確認 Day 3 已完成"
      ],
      actionMissionIds: ["first_win"]
    },
    deck: {
      playerStrong: "核心卡升級",
      playerText: "今天不是換牌，而是讓玩家第一次看到同一張卡升級後的差異。",
      resources: [
        { icon: "energy", text: "素材 12" },
        { icon: "gem", text: "經驗加成 x2" },
        { icon: "gold", text: "升級費用 180" }
      ],
      sceneLabel: "成長同步",
      strong: "把 Day 2 的牌組理解進一步延伸到 Day 3 的升級感。",
      text: "玩家在這裡不是學複雜系統，而是直觀看到一張核心卡升級後，能更穩定地保住場面。",
      header: "升級核心卡片",
      primaryLabel: "升級守護者艾爾",
      primaryAction: "deck",
      secondaryLabel: "回任務頁",
      secondaryHref: "/project1/missions.html",
      deckName: "成長驗證流",
      deckDescription: "以守護者艾爾為核心，展示升級對前中期穩定度的幫助。",
      featuredCard: { name: "守護者艾爾 +1", role: "前排 / 防守 / 升級", rarity: "UP", asset: "/project1-assets/art-guardian-card.svg" },
      replaceNote: "升級後護盾值提高，讓 Day 3 的勝利更像是成長帶來的結果。",
      slots: [
        { name: "先鋒兵", role: "前排站場" },
        { name: "守護者艾爾 +1", role: "升級核心", highlight: true },
        { name: "補師", role: "續戰支援" },
        { name: "遠程射手", role: "後排輸出" },
        { name: "火焰法師", role: "範圍解場" },
        { name: "護盾裝置", role: "拖延節奏" },
        { name: "爆裂投手", role: "中期爆發" },
        { name: "指揮官", role: "增益控制" }
      ],
      statusPending: "尚未升級核心卡。完成後會更清楚感受到 Day 3 的成長節奏。",
      statusDone: "核心卡已升級，現在可以去拿下一場 Day 3 勝利。",
      actionMissionIds: ["upgrade_card"]
    },
    completion: {
      playerStrong: "Day 3 完成獎勵",
      playerText: "今天的獎勵是要讓玩家覺得：原來我現在開始有自己的成長線了。",
      resources: [
        { icon: "gem", text: "雙倍經驗 1 小時" },
        { icon: "energy", text: "Day 4 解鎖" },
        { icon: "gold", text: "強化素材 x8" }
      ],
      sceneLabel: "Day 3 Clear",
      strong: "完成 Day 3 後，玩家應該開始期待明天會學到更進一步的策略差異。",
      text: "這頁的收尾重點是把成長感收進獎勵，並自然往屬性克制與戰術理解過渡。",
      lockTitle: "完成 Day 3 三項任務後解鎖",
      lockText: "請先完成卡牌升級、每日任務與一場勝利，再來領取 Day 3 獎勵。",
      header: "Day 3 完成獎勵",
      claimLabel: "領取 Day 3 獎勵並前往 Day 4",
      rewards: [
        { title: "強化素材", text: "讓 Day 3 的成長有被收起來的感覺。", epic: true },
        { title: "雙倍經驗 1 小時", text: "讓明天登入更有立即性誘因。" },
        { title: "Day 4 戰術教學", text: "開始理解屬性克制與策略差異。" }
      ],
      routes: [
        { label: "明日重點", value: "屬性克制", text: "開始把對戰理解從數值帶向策略差異。" },
        { label: "玩家情緒", value: "我真的變強了", text: "Day 3 要把成長感做得可被記住。" },
        { label: "系統功能", value: "戰術指南", text: "讓玩家願意往更深的玩法理解前進。" },
        { label: "設計意圖", value: "建立中期目標", text: "避免 Day 3 之後開始失去方向。" }
      ]
    },
    missions: [
      { id: "upgrade_card", title: "升級 1 張卡", description: "把核心卡推進到第一個升級節點。", total: 1, reward: "強化素材 x4", ctaLabel: "完成升級" },
      { id: "daily_quest", title: "完成每日任務", description: "建立登入後會做一輪日任的習慣。", total: 1, reward: "雙倍經驗 1 小時", ctaLabel: "完成日任" },
      { id: "first_win", title: "取得 1 場勝利", description: "讓成長感在實戰中被驗證。", total: 1, reward: "金幣 x150", ctaLabel: "拿下一勝" }
    ]
  },
  4: {
    day: 4,
    goal: "理解屬性克制",
    tomorrowUnlock: "連續登入與每日回訪節奏",
    summary: "讓玩家開始理解不同牌組與屬性之間的差異，而不是只靠數值硬撐。",
    pageNames: {
      home: "新手流程首頁",
      lobby: "新手大廳",
      missions: "新手七日任務",
      battle: "戰術分析頁",
      deck: "屬性推薦頁",
      completion: "Day 4 完成獎勵"
    },
    player: {
      title: "進階學員 Alya",
      subtitle: "Day 4｜開始理解屬性與戰術差異",
      resources: [
        { icon: "gold", text: "金幣 1,820" },
        { icon: "gem", text: "屬性卡包 1" },
        { icon: "energy", text: "體力 10 / 20" }
      ]
    },
    home: {
      eyebrow: "DAY 4 ENTRY",
      title: "今天不是再塞新功能，而是讓玩家開始理解策略差異。",
      text: "Day 4 的目標是把玩家從「只知道怎麼玩」推進到「開始理解為什麼這樣玩」，因此會導入屬性克制與策略提示。",
      actions: [
        { eyebrow: "STEP 01", title: "屬性勝利", text: "用指定屬性卡贏一場，理解不同流派有不同價值。" },
        { eyebrow: "STEP 02", title: "策略提示", text: "把戰術說明做得簡短，避免玩家覺得像在上課。" },
        { eyebrow: "STEP 03", title: "回訪節奏", text: "明天開始會把每天登入的習慣建立起來。" }
      ]
    },
    lobby: {
      sceneLabel: "Day 4 戰術入口",
      strong: "今天的重點是讓玩家第一次理解不同屬性與卡組之間的策略差異。",
      text: "大廳要把屬性提示、今日任務與小練習綁在一起，讓 Day 4 不會變成一堆難懂說明。",
      header: "把屬性克制做成小任務，而不是一次灌輸很多規則。",
      primaryLabel: "前往任務頁",
      primaryHref: "/project1/missions.html",
      secondaryLabel: "查看屬性推薦",
      secondaryHref: "/project1/deck-builder.html",
      stats: [
        { label: "今日目標", value: "理解屬性差異", description: "透過一場指定屬性勝利建立策略感。" },
        { label: "戰術提示", value: "短版指南", description: "只給當天最需要知道的克制關係。" },
        { label: "明日預告", value: "連續登入", description: "讓回訪習慣正式成形。" },
        { label: "下一步", value: "前往任務頁", description: "先看今天的屬性任務與戰術小練習。" }
      ]
    },
    missionPage: {
      playerStrong: "Day 4 任務進行中",
      playerText: "今天會第一次接觸屬性克制，但只聚焦一個簡單而可被驗證的策略概念。",
      resources: [
        { icon: "gold", text: "金幣 1,820" },
        { icon: "gem", text: "屬性卡包待領" },
        { icon: "energy", text: "教學練習 3 回合" }
      ],
      sceneLabel: "Day 4 任務總覽",
      strong: "今天不再只講數值，而是讓玩家知道不同卡組與屬性真的有差別。",
      text: "用一場指定屬性勝利、一段策略提示與三回合練習，把 Day 4 的策略理解做成輕量而可消化的任務。",
      header: "Day 4 今日任務",
      primaryLabel: "前往戰術分析頁",
      primaryHref: "/project1/battle-result.html",
      secondaryLabel: "先去屬性推薦頁",
      secondaryHref: "/project1/deck-builder.html",
      highlights: [
        { eyebrow: "DAY 5 預告", title: "連續登入與免費禮包", text: "明天會正式培養每天回來的節奏與短期目標。" },
        { eyebrow: "設計重點", title: "教一個策略概念就好", text: "Day 4 不追求深度，只讓玩家第一次感覺到差異。" },
        { eyebrow: "下一步", title: "看戰術分析頁", text: "理解今天為什麼要指定某個屬性去完成任務。" }
      ]
    },
    battle: {
      playerStrong: "戰術分析",
      playerText: "這一頁不是告訴玩家你錯了，而是讓他知道某個屬性在今天特別有用。",
      resources: [
        { icon: "energy", text: "練習 3 回合" },
        { icon: "gem", text: "策略提示待讀" },
        { icon: "gold", text: "屬性勝利可領卡包" }
      ],
      sceneLabel: "Day 4 戰術提示",
      strong: "今天的重點是理解風屬性在對方厚前排面前會更有優勢。",
      text: "戰術頁要把複雜規則壓縮成一個能立刻採用的建議，讓新手覺得自己學到的是能用的東西。",
      header: "屬性克制與策略提示",
      primaryLabel: "完成 3 回合戰術練習",
      primaryAction: "battle",
      secondaryLabel: "回任務頁",
      secondaryHref: "/project1/missions.html",
      cards: [
        { eyebrow: "戰術提示", title: "風屬性能更快拆前排", text: "今天的對手偏重防守，風屬性較容易取得節奏。" },
        { eyebrow: "戰術提示", title: "別急著交核心技能", text: "先觀察對手場面，再決定是否用資源解牌。" },
        { eyebrow: "設計重點", title: "讓玩家帶著一個理由去對戰", text: "新手更容易把勝負連回到戰術選擇，而不是只怪運氣。" }
      ],
      steps: [
        "1. 先到推薦頁套用今天的屬性卡",
        "2. 回到這頁完成 3 回合戰術練習",
        "3. 再去任務頁補上指定屬性勝利"
      ],
      actionMissionIds: ["practice_rounds"]
    },
    deck: {
      playerStrong: "風屬性推薦卡",
      playerText: "今天的組牌頁不再只是補強，而是告訴玩家今天為什麼推薦這種屬性。",
      resources: [
        { icon: "energy", text: "類型 風屬性" },
        { icon: "gem", text: "稀有 稀有" },
        { icon: "gold", text: "功能 拆前排" }
      ],
      sceneLabel: "屬性推薦",
      strong: "讓玩家理解今天推薦的不是最強卡，而是最適合今天任務的卡。",
      text: "當組牌推薦開始能說明「為什麼」，玩家對策略差異的理解就會比純數值更深一點。",
      header: "風壓突擊流",
      primaryLabel: "查看今日戰術提示",
      primaryAction: "deck",
      secondaryLabel: "回任務頁",
      secondaryHref: "/project1/missions.html",
      deckName: "風壓突擊流",
      deckDescription: "針對 Day 4 練習設計，強調拆前排與保留節奏。",
      featuredCard: { name: "風紋突擊者", role: "風屬性 / 中速 / 稀有", rarity: "TACTIC", asset: "/project1-assets/art-guardian-card.svg" },
      replaceNote: "今天推薦這張卡，是因為它能幫玩家直觀感受屬性克制，而不是單純因為稀有度高。",
      slots: [
        { name: "風紋突擊者", role: "屬性核心", highlight: true },
        { name: "守護者艾爾", role: "前排防守" },
        { name: "補師", role: "續戰支援" },
        { name: "風行射手", role: "後排穿透" },
        { name: "火焰法師", role: "補足範圍解場" },
        { name: "護盾裝置", role: "拖延節奏" },
        { name: "戰術指引", role: "策略提示" },
        { name: "指揮官", role: "增益控制" }
      ],
      statusPending: "尚未查看今日屬性推薦。完成後會更容易理解 Day 4 的戰術任務。",
      statusDone: "已讀取今天的屬性推薦，接著可以去拿下指定屬性勝利。",
      actionMissionIds: ["watch_strategy"]
    },
    completion: {
      playerStrong: "Day 4 完成獎勵",
      playerText: "這一天要收的不是強烈成就感，而是玩家第一次理解策略差異的踏實感。",
      resources: [
        { icon: "gem", text: "屬性卡包 x1" },
        { icon: "energy", text: "Day 5 解鎖" },
        { icon: "gold", text: "戰術指南開啟" }
      ],
      sceneLabel: "Day 4 Clear",
      strong: "當玩家理解一點點策略，就會更願意把遊戲當成每天可以練熟的東西。",
      text: "Day 4 收尾要自然把玩家送進 Day 5 的回訪習慣，而不是停在學會屬性差異本身。",
      lockTitle: "完成 Day 4 三項任務後解鎖",
      lockText: "先完成屬性勝利、策略提示與 3 回合練習，再來領取 Day 4 獎勵。",
      header: "Day 4 完成獎勵",
      claimLabel: "領取 Day 4 獎勵並前往 Day 5",
      rewards: [
        { title: "屬性卡包", text: "強化 Day 4 的策略理解與新鮮感。", epic: true },
        { title: "戰術指南頁解鎖", text: "之後回來仍能查小提示，降低挫折。" },
        { title: "Day 5 連登節奏", text: "明天開始把短期回訪節奏做成習慣。" }
      ],
      routes: [
        { label: "明日重點", value: "每日回訪", text: "讓玩家開始形成每天進來做兩件小事的習慣。" },
        { label: "玩家情緒", value: "我開始懂了", text: "理解策略會讓玩家更願意繼續投入。" },
        { label: "系統功能", value: "免費禮包", text: "Day 5 會開始結合短期誘因與登入節奏。" },
        { label: "設計意圖", value: "建立習慣前先建立理解", text: "玩家理解差異後，更容易接受日常循環。" }
      ]
    },
    missions: [
      { id: "attribute_win", title: "用指定屬性卡獲勝 1 場", description: "透過一場勝利感受屬性差異。", total: 1, reward: "屬性卡包 x1", ctaLabel: "完成屬性勝利" },
      { id: "watch_strategy", title: "觀看策略提示", description: "理解今天推薦這個屬性的原因。", total: 1, reward: "戰術指南解鎖", ctaLabel: "查看策略提示" },
      { id: "practice_rounds", title: "完成 3 回合教學練習", description: "用短版練習把戰術提示消化掉。", total: 3, reward: "金幣 x120", ctaLabel: "完成練習" }
    ]
  },
  5: {
    day: 5,
    goal: "建立登入習慣",
    tomorrowUnlock: "排名戰與輕度競爭",
    summary: "把前四天的理解轉成每天回來完成一輪小任務的習慣。",
    pageNames: {
      home: "新手流程首頁",
      lobby: "新手大廳",
      missions: "新手七日任務",
      battle: "日常節奏頁",
      deck: "免費禮包頁",
      completion: "Day 5 完成獎勵"
    },
    player: {
      title: "進階學員 Alya",
      subtitle: "Day 5｜開始形成每天回來的理由",
      resources: [
        { icon: "gold", text: "金幣 2,080" },
        { icon: "gem", text: "抽卡券 2" },
        { icon: "energy", text: "體力 13 / 20" }
      ]
    },
    home: {
      eyebrow: "DAY 5 ENTRY",
      title: "今天不追求新規則，而是讓玩家開始習慣每天上來拿一點進展。",
      text: "Day 5 會把登入、兩個日任與免費禮包串成短期回訪節奏，讓玩家知道每天進來都有一點可完成的東西。",
      actions: [
        { eyebrow: "STEP 01", title: "登入獎勵", text: "讓回來這件事本身就有收穫，而不是空白開始。" },
        { eyebrow: "STEP 02", title: "兩個日任", text: "把任務量控制在輕度，避免例行作業感太重。" },
        { eyebrow: "STEP 03", title: "免費禮包", text: "用短期獎勵補一點期待感與回流理由。" }
      ]
    },
    lobby: {
      sceneLabel: "Day 5 回流節奏",
      strong: "今天的關鍵不是學新東西，而是讓玩家開始每天都願意回來做一輪。",
      text: "大廳在 Day 5 應該像一個輕量儀式，玩家一眼就知道今天登入可拿什麼、做什麼、做完之後會期待什麼。",
      header: "把日常節奏做得剛好，不要讓玩家感覺是在打卡上班。",
      primaryLabel: "前往任務頁",
      primaryHref: "/project1/missions.html",
      secondaryLabel: "領取免費禮包",
      secondaryHref: "/project1/deck-builder.html",
      stats: [
        { label: "今日目標", value: "完成登入循環", description: "登入、兩個日任與免費禮包三個小節點。" },
        { label: "玩家情緒", value: "回來有東西拿", description: "降低回訪阻力，培養輕度習慣。" },
        { label: "明日預告", value: "排名戰", description: "明天開始碰到一點點競技與壓力管理。" },
        { label: "下一步", value: "先看任務頁", description: "用三個短任務收起今天的回流節奏。" }
      ]
    },
    missionPage: {
      playerStrong: "Day 5 任務進行中",
      playerText: "今天的目標不是學新功能，而是讓玩家開始覺得每天登入做一輪是有價值的。",
      resources: [
        { icon: "gold", text: "金幣 2,080" },
        { icon: "gem", text: "免費禮包待領" },
        { icon: "energy", text: "日任 2 / 2" }
      ],
      sceneLabel: "Day 5 任務總覽",
      strong: "登入、兩個日任與免費禮包會一起組成每天回來的最小循環。",
      text: "Day 5 的設計重點是節奏感。玩家只要花一點時間就能完成今天的任務，並自然期待明天的內容。",
      header: "Day 5 今日任務",
      primaryLabel: "查看日常節奏頁",
      primaryHref: "/project1/battle-result.html",
      secondaryLabel: "去領免費禮包",
      secondaryHref: "/project1/deck-builder.html",
      highlights: [
        { eyebrow: "DAY 6 預告", title: "排名戰與保護機制", text: "明天會開始接觸競技，但會用輕度保護降低壓力。" },
        { eyebrow: "設計重點", title: "日常任務不能太像作業", text: "玩家今天應該覺得輕鬆，而不是疲勞。" },
        { eyebrow: "下一步", title: "先領免費禮包", text: "讓回來這件事一開始就有小獎勵與期待感。" }
      ]
    },
    battle: {
      playerStrong: "日常節奏回顧",
      playerText: "Day 5 的回饋頁不強調勝敗，而是讓玩家覺得今天的日常循環完成得很順。",
      resources: [
        { icon: "energy", text: "日任 2 個" },
        { icon: "gem", text: "免費禮包待領" },
        { icon: "gold", text: "連登點數 +1" }
      ],
      sceneLabel: "Day 5 日常節奏",
      strong: "今天要讓玩家感覺：每天回來做一輪任務，其實不會很累，而且有持續前進。",
      text: "這一頁像日常結算，重點是把完成兩個日任的節奏感做出來，讓玩家不會覺得只是瑣碎清單。",
      header: "今天的日常任務已完成一半",
      primaryLabel: "模擬完成 2 個日任",
      primaryAction: "battle",
      secondaryLabel: "回任務頁",
      secondaryHref: "/project1/missions.html",
      cards: [
        { eyebrow: "日常重點", title: "回來就有事可做", text: "玩家一登入就能看到最短路徑，而不是一堆雜訊。" },
        { eyebrow: "日常重點", title: "任務量要夠輕", text: "如果今天太重，Day 6 前就容易開始疲勞。" },
        { eyebrow: "設計重點", title: "讓回訪變成儀式感", text: "玩家完成後會覺得自己有穩定向前，而不是只是打卡。" }
      ],
      steps: [
        "1. 先回到禮包頁領取免費獎勵",
        "2. 回這頁模擬完成 2 個日任",
        "3. 回任務頁確認 Day 5 已收起來"
      ],
      actionMissionIds: ["daily_tasks"]
    },
    deck: {
      playerStrong: "免費禮包",
      playerText: "Day 5 的這頁不再是深度組牌，而是回訪節奏裡的一個短獎勵節點。",
      resources: [
        { icon: "energy", text: "禮包 每日 1 次" },
        { icon: "gem", text: "抽卡券 1" },
        { icon: "gold", text: "金幣 200" }
      ],
      sceneLabel: "回流獎勵",
      strong: "讓玩家登入後先拿到一個小獎勵，會大幅降低繼續往下做任務的阻力。",
      text: "這頁在 Day 5 的功能是短、快、明確。玩家一點就拿到獎勵，然後去完成今天的兩個日任。",
      header: "每日免費禮包",
      primaryLabel: "領取免費禮包",
      primaryAction: "deck",
      secondaryLabel: "回任務頁",
      secondaryHref: "/project1/missions.html",
      deckName: "今日登入補給",
      deckDescription: "不是牌組調整，而是把回流獎勵設計成有價值但不會通膨的補給。",
      featuredCard: { name: "新手補給箱", role: "抽卡券 / 金幣 / 素材", rarity: "FREE", asset: "/project1-assets/art-victory-emblem.svg" },
      replaceNote: "Day 5 的「組牌頁」在這裡被轉化成獎勵頁，展示每日回訪節奏如何銜接任務系統。",
      slots: [
        { name: "抽卡券 x1", role: "短期期待", highlight: true },
        { name: "金幣 x200", role: "日常補給" },
        { name: "素材 x4", role: "延續成長" },
        { name: "登入點數", role: "連續回訪" },
        { name: "補給箱", role: "每日儀式感" },
        { name: "回流提示", role: "減少流失" },
        { name: "商店入口", role: "免費禮包" },
        { name: "明日預告", role: "排名戰" }
      ],
      statusPending: "尚未領取 Day 5 免費禮包。完成後更容易把今天的日常節奏跑完。",
      statusDone: "免費禮包已領取，現在回任務頁把今天的日常任務收起來。",
      actionMissionIds: ["claim_gift"]
    },
    completion: {
      playerStrong: "Day 5 完成獎勵",
      playerText: "今天的獎勵不是大爆發，而是讓玩家開始習慣每天都能往前推一點。",
      resources: [
        { icon: "gem", text: "抽卡券 x1" },
        { icon: "energy", text: "Day 6 解鎖" },
        { icon: "gold", text: "連登點數 +1" }
      ],
      sceneLabel: "Day 5 Clear",
      strong: "當玩家開始形成日常節奏，Day 6 的輕競技模式才不會顯得突兀。",
      text: "這頁要把每天回來的穩定感收起來，並告訴玩家明天會開始碰到一點更進階的目標。",
      lockTitle: "完成 Day 5 三項任務後解鎖",
      lockText: "先完成登入、2 個日任與免費禮包，再來領取 Day 5 獎勵。",
      header: "Day 5 完成獎勵",
      claimLabel: "領取 Day 5 獎勵並前往 Day 6",
      rewards: [
        { title: "抽卡券 x1", text: "讓每日回訪繼續有短期期待。", epic: true },
        { title: "連登點數 +1", text: "把每天回來的儀式感收進系統。" },
        { title: "Day 6 排名戰解鎖", text: "明天開始碰到競技，但仍保留新手保護。" }
      ],
      routes: [
        { label: "明日重點", value: "輕度競爭", text: "讓玩家開始試著把前幾天的理解用在排名戰。" },
        { label: "玩家情緒", value: "我每天都能推進一點", text: "Day 5 最重要的是穩定感，而不是刺激感。" },
        { label: "系統功能", value: "排名保護", text: "降低 Day 6 初次碰競技時的壓力。" },
        { label: "設計意圖", value: "習慣先於壓力", text: "先建立回訪，再引入更進階目標。" }
      ]
    },
    missions: [
      { id: "daily_login", title: "登入遊戲", description: "讓玩家把回來這件事本身視為有價值。", total: 1, reward: "連登點數 +1", ctaLabel: "完成登入" },
      { id: "daily_tasks", title: "完成 2 個日任", description: "建立輕量日常循環，不讓玩家覺得疲勞。", total: 2, reward: "金幣 x150", ctaLabel: "完成日任" },
      { id: "claim_gift", title: "領取免費禮包", description: "用小獎勵增加回流動機。", total: 1, reward: "抽卡券 x1", ctaLabel: "領取禮包" }
    ]
  },
  6: {
    day: 6,
    goal: "進入輕度競爭",
    tomorrowUnlock: "長期目標與新手畢業",
    summary: "讓玩家開始碰到競技，但用保護與推薦機制降低第一步的壓力。",
    pageNames: {
      home: "新手流程首頁",
      lobby: "新手大廳",
      missions: "新手七日任務",
      battle: "排名戰回顧",
      deck: "排名推薦牌組",
      completion: "Day 6 完成獎勵"
    },
    player: {
      title: "預備牌手 Alya",
      subtitle: "Day 6｜開始接觸輕度競技",
      resources: [
        { icon: "gold", text: "金幣 2,360" },
        { icon: "gem", text: "排名保護券 1" },
        { icon: "energy", text: "體力 12 / 20" }
      ]
    },
    home: {
      eyebrow: "DAY 6 ENTRY",
      title: "今天開始碰到競爭，但不能讓新手一上來就被打退。",
      text: "Day 6 會導入排名戰、戰報查看與一次牌組調整。重點不是要玩家立刻變強，而是讓他願意踏出競技第一步。",
      actions: [
        { eyebrow: "STEP 01", title: "打一場排名戰", text: "用低風險方式讓玩家第一次接觸競技。" },
        { eyebrow: "STEP 02", title: "查看戰報", text: "輸贏之後要能看懂自己卡在哪裡。" },
        { eyebrow: "STEP 03", title: "再調整一次牌組", text: "讓玩家知道競技和推薦牌組之間的關係。" }
      ]
    },
    lobby: {
      sceneLabel: "Day 6 排名入口",
      strong: "今天的重點不是打贏所有人，而是敢進去打一場排名戰，並知道自己可以怎麼調整。",
      text: "大廳要把排名保護、戰報入口與推薦牌組放在一起，讓 Day 6 的壓力保持在可接受範圍。",
      header: "競技模式的第一步要低風險，才能讓新手願意嘗試。",
      primaryLabel: "前往任務頁",
      primaryHref: "/project1/missions.html",
      secondaryLabel: "查看排名牌組",
      secondaryHref: "/project1/deck-builder.html",
      stats: [
        { label: "今日目標", value: "打一場排名戰", description: "重點是跨出去，而不是追求高勝率。" },
        { label: "保護機制", value: "排名保護券", description: "減少第一次碰競技時的心理負擔。" },
        { label: "明日預告", value: "新手畢業", description: "Day 7 會把玩家正式接到長期目標。" },
        { label: "下一步", value: "先看任務頁", description: "用三個小節點收起 Day 6 的競技導入。" }
      ]
    },
    missionPage: {
      playerStrong: "Day 6 任務進行中",
      playerText: "今天要讓玩家敢打排名戰，也知道輸掉之後仍然能靠推薦與戰報往前推。",
      resources: [
        { icon: "gold", text: "金幣 2,360" },
        { icon: "gem", text: "排名保護券 1" },
        { icon: "energy", text: "戰報 1 份" }
      ],
      sceneLabel: "Day 6 任務總覽",
      strong: "用一場排名戰、一份戰報與一次牌組調整，把競技第一步做得不那麼可怕。",
      text: "Day 6 不能只把玩家丟進競技，而是要給足夠保護與回饋，讓嘗試本身就有價值。",
      header: "Day 6 今日任務",
      primaryLabel: "前往排名戰回顧",
      primaryHref: "/project1/battle-result.html",
      secondaryLabel: "先去推薦牌組",
      secondaryHref: "/project1/deck-builder.html",
      highlights: [
        { eyebrow: "DAY 7 預告", title: "新手畢業與長期目標", text: "明天會把玩家接到週活動、排行戰與流派選擇。" },
        { eyebrow: "設計重點", title: "先降低壓力再談競爭", text: "如果 Day 6 太挫折，Day 7 很難收得漂亮。" },
        { eyebrow: "下一步", title: "看戰報頁", text: "先理解排名戰結果，再回頭調整今天的牌組。" }
      ]
    },
    battle: {
      playerStrong: "排名戰回顧",
      playerText: "Day 6 的戰鬥頁要讓玩家覺得自己不是被懲罰，而是被教著怎麼更好。",
      resources: [
        { icon: "energy", text: "排名戰 1 場" },
        { icon: "gem", text: "保護券生效中" },
        { icon: "gold", text: "戰報已生成" }
      ],
      sceneLabel: "Day 6 排名戰",
      strong: "玩家第一次碰到排名模式後，要先看懂結果，而不是立刻被淘汰感壓垮。",
      text: "這頁的目的在於把競技模式的第一步做成可學習的體驗，而不是只告訴玩家你輸了或你很弱。",
      header: "第一場排名戰回顧",
      primaryLabel: "模擬完成排名戰",
      primaryAction: "battle",
      secondaryLabel: "回任務頁",
      secondaryHref: "/project1/missions.html",
      cards: [
        { eyebrow: "戰報重點", title: "中期資源分配不穩", text: "對手在第 6 回合拉開差距，你的後續資源接不上。" },
        { eyebrow: "戰報重點", title: "推薦牌組仍可優化", text: "今天的任務會讓玩家再做一次小幅調整，降低競技壓力。" },
        { eyebrow: "設計重點", title: "先讓玩家願意再打一場", text: "競技導入最重要的是讓第一次不是最後一次。" }
      ],
      steps: [
        "1. 完成今天的排名戰任務",
        "2. 回推薦牌組頁做一次調整",
        "3. 用戰報理解自己差在哪裡"
      ],
      actionMissionIds: ["rank_battle", "view_report"]
    },
    deck: {
      playerStrong: "排名推薦牌組",
      playerText: "今天的推薦牌組是幫玩家降低競技壓力，而不是教他組最難的套牌。",
      resources: [
        { icon: "energy", text: "模式 排名戰" },
        { icon: "gem", text: "保護券 1" },
        { icon: "gold", text: "調整 1 次" }
      ],
      sceneLabel: "排名推薦",
      strong: "當玩家第一次碰競技，推薦牌組的角色就是讓他有膽量再打下一場。",
      text: "這頁的推薦不需要最強，而要最穩，讓玩家在 Day 6 感覺自己是被照顧著跨進排名戰。",
      header: "穩定排名流",
      primaryLabel: "套用排名推薦牌組",
      primaryAction: "deck",
      secondaryLabel: "回任務頁",
      secondaryHref: "/project1/missions.html",
      deckName: "穩定排名流",
      deckDescription: "保留原本熟悉的牌組骨架，只做一點適合排名戰的微調。",
      featuredCard: { name: "守護者艾爾 +2", role: "前排 / 防守 / 排名推薦", rarity: "RANK", asset: "/project1-assets/art-guardian-card.svg" },
      replaceNote: "Day 6 的組牌調整不是大改，而是讓玩家感覺自己有能力再進場一次。",
      slots: [
        { name: "守護者艾爾 +2", role: "穩定前排", highlight: true },
        { name: "戰場補師", role: "續戰支援" },
        { name: "遠程射手", role: "後排輸出" },
        { name: "火焰法師", role: "範圍解場" },
        { name: "護盾裝置", role: "拖延節奏" },
        { name: "爆裂投手", role: "中期爆發" },
        { name: "指揮官", role: "節奏控制" },
        { name: "戰報筆記", role: "學習回看" }
      ],
      statusPending: "尚未套用排名推薦牌組。完成後更容易把 Day 6 的競技壓力降下來。",
      statusDone: "排名推薦牌組已套用，現在可以安心把 Day 6 收尾。",
      actionMissionIds: ["adjust_rank_deck"]
    },
    completion: {
      playerStrong: "Day 6 完成獎勵",
      playerText: "今天的收尾重點是讓玩家覺得：原來我也可以開始碰競技，而且沒有那麼可怕。",
      resources: [
        { icon: "gem", text: "排名保護券 x1" },
        { icon: "energy", text: "Day 7 解鎖" },
        { icon: "gold", text: "推薦牌組範本" }
      ],
      sceneLabel: "Day 6 Clear",
      strong: "當競技第一步成功被收住，Day 7 才能自然往長期玩法與偏好流派延伸。",
      text: "這頁會把 Day 6 的壓力收成一種『我做到了』的感覺，並把玩家送往新手畢業的最後一天。",
      lockTitle: "完成 Day 6 三項任務後解鎖",
      lockText: "先完成排名戰、查看戰報與調整牌組，再來領取 Day 6 獎勵。",
      header: "Day 6 完成獎勵",
      claimLabel: "領取 Day 6 獎勵並前往 Day 7",
      rewards: [
        { title: "排名保護券", text: "讓玩家對競技保持安全感。", epic: true },
        { title: "推薦牌組範本", text: "降低之後再進競技的學習成本。" },
        { title: "Day 7 畢業收尾", text: "明天將正式進入偏好流派與長期玩法。" }
      ],
      routes: [
        { label: "明日重點", value: "選流派與畢業", text: "讓玩家正式知道自己接下來要玩什麼。" },
        { label: "玩家情緒", value: "我敢碰競技了", text: "Day 6 的成功來自保護與清楚引導。" },
        { label: "系統功能", value: "流派選擇", text: "把前六天的理解整合成長期方向。" },
        { label: "設計意圖", value: "競技不是挫折來源", text: "而是下一階段開始前的暖身。" }
      ]
    },
    missions: [
      { id: "rank_battle", title: "參加排名戰 1 次", description: "鼓勵玩家踏出第一次競技嘗試。", total: 1, reward: "排名保護券 x1", ctaLabel: "完成排名戰" },
      { id: "view_report", title: "查看戰報", description: "用戰報理解自己差在哪裡。", total: 1, reward: "金幣 x100", ctaLabel: "查看戰報" },
      { id: "adjust_rank_deck", title: "調整一次牌組", description: "把戰報與推薦調整接起來。", total: 1, reward: "推薦牌組範本", ctaLabel: "套用推薦" }
    ]
  },
  7: {
    day: 7,
    goal: "形成長期目標",
    tomorrowUnlock: "排行戰、週活動與公會系統",
    summary: "把前六天收斂成一個完整的新手畢業節點，接到真正的長期玩法。",
    pageNames: {
      home: "新手流程首頁",
      lobby: "新手大廳",
      missions: "新手七日任務",
      battle: "畢業驗證頁",
      deck: "流派選擇頁",
      completion: "完成獎勵頁"
    },
    player: {
      title: "正式牌手 Alya",
      subtitle: "Day 7｜新手畢業與長期目標",
      resources: [
        { icon: "gold", text: "金幣 2,800" },
        { icon: "gem", text: "史詩卡待領" },
        { icon: "energy", text: "體力 15 / 20" }
      ]
    },
    home: {
      eyebrow: "DAY 7 ENTRY",
      title: "最後一天不是結束，而是把玩家正式送進真正會留下來的內容。",
      text: "Day 7 的關鍵是讓玩家選擇偏好流派、收藏第一套初階套牌，並清楚知道接下來可以去哪裡玩。",
      actions: [
        { eyebrow: "STEP 01", title: "完成七日累積任務", text: "讓玩家有完整旅程的收尾與畢業感。" },
        { eyebrow: "STEP 02", title: "選擇偏好流派", text: "開始從系統給你的內容，變成你自己偏好的玩法。" },
        { eyebrow: "STEP 03", title: "前往長期玩法", text: "排行戰、週活動與公會應自然地出現在下一步。" }
      ]
    },
    lobby: {
      sceneLabel: "Day 7 畢業入口",
      strong: "今天的重點是把前六天的學習，收成一個真正能持續玩的長期目標。",
      text: "大廳在 Day 7 要像一個畢業門口，讓玩家知道自己完成了什麼，也知道下一步要去哪裡。",
      header: "最後一天要給完成感，也要把長期路徑講清楚。",
      primaryLabel: "前往任務頁",
      primaryHref: "/project1/missions.html",
      secondaryLabel: "查看流派選擇",
      secondaryHref: "/project1/deck-builder.html",
      stats: [
        { label: "今日目標", value: "正式畢業", description: "完成累積任務、選流派並收藏第一套套牌。" },
        { label: "長期導流", value: "週活動 / 排行戰", description: "不讓 Day 7 成為沒有下一步的句點。" },
        { label: "玩家情緒", value: "我準備好了", description: "讓新手真的感覺自己能進入主玩法。" },
        { label: "下一步", value: "收起 Day 7", description: "先去任務頁完成最後三個收尾節點。" }
      ]
    },
    missionPage: {
      playerStrong: "Day 7 任務進行中",
      playerText: "今天的任務不是重複前幾天，而是把前六天收成一個完整的新手畢業節點。",
      resources: [
        { icon: "gold", text: "金幣 2,800" },
        { icon: "gem", text: "史詩卡待領" },
        { icon: "energy", text: "畢業徽章待解鎖" }
      ],
      sceneLabel: "Day 7 任務總覽",
      strong: "完成七日累積任務、選擇偏好流派、收藏第一套初階套牌，就是最後一天的核心主線。",
      text: "最後一天的任務要讓玩家感覺到完整旅程被收住，同時接到真正會留下來的長期內容。",
      header: "Day 7 今日任務",
      primaryLabel: "查看畢業驗證頁",
      primaryHref: "/project1/battle-result.html",
      secondaryLabel: "先去流派選擇頁",
      secondaryHref: "/project1/deck-builder.html",
      highlights: [
        { eyebrow: "畢業目標", title: "不是句點，是銜接", text: "Day 7 的任務要自然把玩家接到週活動、排行戰與公會。" },
        { eyebrow: "設計重點", title: "讓玩家選擇偏好", text: "當玩家開始選流派，就更像是在建立自己的玩法身份。" },
        { eyebrow: "下一步", title: "先去流派頁", text: "完成偏好流派與套牌收藏，最後再來領取畢業獎勵。" }
      ]
    },
    battle: {
      playerStrong: "畢業驗證",
      playerText: "Day 7 的戰鬥頁不只是在說你贏了，而是在說你已經準備好進入主玩法循環。",
      resources: [
        { icon: "energy", text: "七日累積任務" },
        { icon: "gem", text: "流派選擇待完成" },
        { icon: "gold", text: "畢業獎勵已待命" }
      ],
      sceneLabel: "Day 7 畢業驗證",
      strong: "現在玩家不是只是新手，而是已經能理解自己的偏好並準備進入長期內容。",
      text: "這頁的作用是把前六天的教學、補強、成長、策略與競技導入收成一個完整的新手畢業感。",
      header: "七日旅程的最後驗證",
      primaryLabel: "完成七日累積任務",
      primaryAction: "battle",
      secondaryLabel: "回任務頁",
      secondaryHref: "/project1/missions.html",
      cards: [
        { eyebrow: "畢業感", title: "玩家知道自己會玩什麼", text: "流派選擇讓 Day 7 不只是領獎，而是建立玩法身份。" },
        { eyebrow: "畢業感", title: "玩家知道接下來去哪裡", text: "排行戰、週活動與公會要被清楚列成下一步。" },
        { eyebrow: "設計重點", title: "把前六天收成完整旅程", text: "讓新手期像一段真正有起承轉合的體驗。" }
      ],
      steps: [
        "1. 完成七日累積任務",
        "2. 前往流派選擇頁收藏第一套初階套牌",
        "3. 回到完成獎勵頁領取畢業收尾"
      ],
      actionMissionIds: ["finish_seven_day"]
    },
    deck: {
      playerStrong: "流派選擇",
      playerText: "最後一天的組牌頁要讓玩家開始覺得：這是我喜歡的玩法，而不是系統硬塞給我的推薦。",
      resources: [
        { icon: "energy", text: "流派 3 選 1" },
        { icon: "gem", text: "史詩卡待搭配" },
        { icon: "gold", text: "初階套牌收藏" }
      ],
      sceneLabel: "偏好流派",
      strong: "讓玩家開始選擇自己的玩法偏好，是 Day 7 最重要的身份建立。",
      text: "這頁的推薦不再只是『今天最適合』，而是開始區分穩定推進流、爆發進攻流與控制拖延流等長期方向。",
      header: "初階流派收藏",
      primaryLabel: "收藏初階套牌",
      primaryAction: "deck",
      secondaryLabel: "回任務頁",
      secondaryHref: "/project1/missions.html",
      deckName: "守護穩推流",
      deckDescription: "給剛畢業的新手一套穩定、好上手、能延伸到主玩法的基礎流派。",
      featuredCard: { name: "星耀守護者", role: "史詩 / 守護 / 新手畢業", rarity: "EPIC", asset: "/project1-assets/art-guardian-card.svg" },
      replaceNote: "Day 7 的組牌頁要讓玩家感覺自己開始在做選擇，而不是只是完成作業。",
      slots: [
        { name: "星耀守護者", role: "畢業核心", highlight: true },
        { name: "戰場補師", role: "續戰支援" },
        { name: "遠程射手", role: "後排輸出" },
        { name: "火焰法師", role: "範圍解場" },
        { name: "護盾裝置", role: "拖延節奏" },
        { name: "爆裂投手", role: "中期爆發" },
        { name: "指揮官", role: "節奏控制" },
        { name: "流派標記", role: "長期方向" }
      ],
      statusPending: "尚未完成流派選擇與初階套牌收藏。這一步會讓 Day 7 更像正式畢業。",
      statusDone: "初階套牌已收藏，現在只差回到完成頁領取最終畢業獎勵。",
      actionMissionIds: ["choose_archetype", "collect_starter"]
    },
    completion: {
      playerStrong: "星耀認證",
      playerText: "這頁負責把新手期接到長期玩法，而不只是單純發獎。",
      resources: [
        { icon: "gem", text: "史詩卡 x1" },
        { icon: "energy", text: "徽章 x1" },
        { icon: "gold", text: "金幣 x500" }
      ],
      sceneLabel: "新手畢業",
      strong: "這個畫面要讓玩家感覺自己不是結束，而是正式進入主玩法循環。",
      text: "完成頁除了獎勵感，也要負責導到排行戰、週活動或公會系統，這樣新手流程才有真正的留存銜接。",
      lockTitle: "完成 Day 7 三項任務後解鎖",
      lockText: "先完成七日累積任務、選擇偏好流派與收藏初階套牌，這個畢業頁才會正式解鎖。",
      header: "新手畢業獎勵",
      claimLabel: "領取並完成新手畢業展示",
      rewards: [
        { title: "史詩卡 x1", text: "立即提升牌組上限，建立畢業感。", epic: true },
        { title: "七日完成徽章", text: "強化身份認同與完成感。" },
        { title: "週活動入口", text: "把玩家自然接到下一階段內容。" }
      ],
      routes: [
        { label: "排行戰", value: "實力相近對戰", text: "讓玩家把前期學到的玩法用在正式模式。" },
        { label: "週活動", value: "限時目標與獎勵", text: "提供回流理由與短期成長目標。" },
        { label: "公會", value: "社交與合作玩法", text: "延伸到更長期的留存內容。" },
        { label: "設計目的", value: "不是句點，是銜接", text: "這頁要把結束變成新的開始。" }
      ]
    },
    missions: [
      { id: "finish_seven_day", title: "完成七日累積任務", description: "把前六天的內容收成完整旅程。", total: 1, reward: "史詩卡 x1", ctaLabel: "完成畢業任務" },
      { id: "choose_archetype", title: "選擇偏好流派", description: "開始建立自己的玩法身份。", total: 1, reward: "流派標記", ctaLabel: "選擇流派" },
      { id: "collect_starter", title: "收藏 1 套初階套牌", description: "把偏好流派正式收成自己的第一套主玩法套牌。", total: 1, reward: "七日完成徽章", ctaLabel: "收藏套牌" }
    ]
  }
};

function buildInitialState() {
  return {
    currentDay: 1,
    finished: false,
    dayStates: Object.values(DAY_CONFIG).map((config) => ({
      day: config.day,
      rewardClaimed: false,
      missions: config.missions.map((mission) => ({
        id: mission.id,
        current: 0,
        total: mission.total
      }))
    }))
  };
}

function cloneStateTemplate() {
  return JSON.parse(JSON.stringify(buildInitialState()));
}

function normalizeState(raw) {
  const fresh = buildInitialState();
  if (!raw || !Array.isArray(raw.dayStates)) return fresh;

  fresh.currentDay = Number.isInteger(raw.currentDay) ? Math.min(Math.max(raw.currentDay, 1), 7) : 1;
  fresh.finished = Boolean(raw.finished);

  fresh.dayStates = fresh.dayStates.map((dayTemplate) => {
    const existing = raw.dayStates.find((item) => item.day === dayTemplate.day);
    if (!existing || !Array.isArray(existing.missions)) return dayTemplate;

    return {
      ...dayTemplate,
      rewardClaimed: Boolean(existing.rewardClaimed),
      missions: dayTemplate.missions.map((missionTemplate) => {
        const existingMission = existing.missions.find((item) => item.id === missionTemplate.id);
        if (!existingMission) return missionTemplate;

        return {
          ...missionTemplate,
          current: Math.max(0, Math.min(existingMission.current ?? 0, missionTemplate.total))
        };
      })
    };
  });

  return fresh;
}

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneStateTemplate();
    return normalizeState(JSON.parse(raw));
  } catch {
    return cloneStateTemplate();
  }
}

function saveState(state) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resetState() {
  const fresh = cloneStateTemplate();
  saveState(fresh);
  return fresh;
}

function setFlash(payload) {
  window.sessionStorage.setItem(FLASH_KEY, JSON.stringify(payload));
}

function consumeFlash() {
  try {
    const raw = window.sessionStorage.getItem(FLASH_KEY);
    if (!raw) return null;
    window.sessionStorage.removeItem(FLASH_KEY);
    return JSON.parse(raw);
  } catch {
    window.sessionStorage.removeItem(FLASH_KEY);
    return null;
  }
}

function getDayConfig(day) {
  return DAY_CONFIG[day];
}

function getDayVisuals(day) {
  return DAY_VISUALS[day];
}

function getDayMeta(day) {
  return DAY_META[day];
}

function getDayState(state, day) {
  return state.dayStates.find((item) => item.day === day);
}

function getMissionProgress(dayState, missionId) {
  return dayState.missions.find((item) => item.id === missionId);
}

function mergedMissions(config, dayState) {
  return config.missions.map((mission) => {
    const progress = getMissionProgress(dayState, mission.id);
    return {
      ...mission,
      current: progress?.current ?? 0
    };
  });
}

function completionPercent(dayState) {
  return Math.round((completedMissionCount(dayState) / dayState.missions.length) * 100);
}

function missionTone(index) {
  const tones = ["CORE LOOP", "BOOST STEP", "REWARD NODE"];
  return tones[index % tones.length];
}

function battleResultTone(score) {
  if (score.includes("7 / 7") || score.includes("1 / 0") || score.includes("3 / 0")) return "穩定通關";
  if (score.includes("MR")) return "排名試水溫";
  if (score.includes("連續") || score.includes("日")) return "回訪節奏";
  return "需要補強";
}

function deckPowerEstimate(config, dayState) {
  const completed = completedMissionCount(dayState);
  return 320 + config.day * 85 + completed * 30;
}

function unlockStateLabel(config, dayState) {
  if (dayState.rewardClaimed) return "已完成今日收尾";
  if (rewardReady(dayState)) return "可前往完成獎勵";
  return "主線仍在進行";
}

function completedMissionCount(dayState) {
  return dayState.missions.filter((mission) => mission.current >= mission.total).length;
}

function completedDayCount(state) {
  return state.dayStates.filter((dayState) => dayState.rewardClaimed).length;
}

function missionStatus(mission) {
  if (mission.current >= mission.total) return "已完成";
  if (mission.current > 0) return "進行中";
  return "未完成";
}

function updateMissionProgress(state, day, missionId, amount = null) {
  const dayState = getDayState(state, day);
  const mission = getMissionProgress(dayState, missionId);
  if (!mission) return false;
  mission.current = amount === null ? mission.total : Math.max(0, Math.min(amount, mission.total));
  return true;
}

function completeMission(state, day, missionId) {
  return updateMissionProgress(state, day, missionId, null);
}

function rewardReady(dayState) {
  return completedMissionCount(dayState) === dayState.missions.length;
}

function nextRecommendation(state, config, dayState) {
  if (state.finished) return "七日流程已完整完成，可直接帶面試官看排行戰、週活動與公會銜接。";
  if (rewardReady(dayState) && !dayState.rewardClaimed) return "今天的任務已全數完成，現在可以前往獎勵頁收尾並解鎖下一天。";
  const mission = mergedMissions(config, dayState).find((item) => item.current < item.total);
  if (!mission) return `Day ${config.day} 任務已完成，可前往完成獎勵頁。`;
  return `先完成「${mission.title}」，把今天的主線再往前推一步。`;
}

function toastFor(page, config, state, dayState) {
  if (state.finished) return "這組七日流程已完整畢業，現在很適合直接當面試 demo 主案例。";
  if (page === "home") return `Day ${config.day} 的核心是「${config.goal}」，首頁要先把今天的設計重點講清楚。`;
  if (page === "lobby") return `大廳目前對應 Day ${config.day}，重點是把今日目標、下一步和明日預告綁在一起。`;
  if (page === "missions") return `任務頁目前是 Day ${config.day}，三項任務都要直接對應今天唯一的學習重點。`;
  if (page === "battle") return `這個回饋頁現在對應 Day ${config.day}，目的是讓玩家知道自己接下來要怎麼推進。`;
  if (page === "deck") return `這一頁在 Day ${config.day} 的角色是「${config.pageNames.deck}」，用來把今天的系統理解串起來。`;
  if (page === "completion") {
    return rewardReady(dayState)
      ? `Day ${config.day} 已達成收尾條件，現在可以正式領取今天的獎勵。`
      : `先把 Day ${config.day} 的三項任務完成，完成頁才會真正有畢業感。`;
  }
  return nextRecommendation(state, config, dayState);
}

function ensureFxLayer() {
  let layer = document.querySelector(".fx-layer");
  if (!layer) {
    layer = document.createElement("div");
    layer.className = "fx-layer";
    document.body.appendChild(layer);
  }
  return layer;
}

function emitSparks(kind = "success", count = 18) {
  const layer = ensureFxLayer();
  const centerX = window.innerWidth * 0.52;
  const centerY = window.innerHeight * 0.28;

  Array.from({ length: count }).forEach((_, index) => {
    const spark = document.createElement("span");
    spark.className = `fx-spark is-${kind}`;
    const angle = (Math.PI * 2 * index) / count;
    const distance = 70 + Math.random() * 90;
    spark.style.left = `${centerX}px`;
    spark.style.top = `${centerY}px`;
    spark.style.setProperty("--spin", `${Math.random() * 120 - 60}deg`);
    spark.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    spark.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
    layer.appendChild(spark);
    spark.addEventListener("animationend", () => spark.remove(), { once: true });
  });
}

function badgeMarkup(day) {
  const visuals = getDayVisuals(day);
  return `<span class="game-day-badge is-day-${day}">${visuals.badge}</span>`;
}

function inlineTitleMarkup(title, day) {
  const visuals = getDayVisuals(day);
  return `<span class="game-inline-title"><img class="game-inline-icon" src="${visuals.icon}" alt="">${title}</span>`;
}

function dayButtonMarkup(day, state) {
  const visuals = getDayVisuals(day);
  const config = getDayConfig(day);
  const dayState = getDayState(state, day);
  const classes = [
    "game-day-button",
    day === state.currentDay ? "is-active" : "",
    dayState.rewardClaimed ? "is-done" : ""
  ].filter(Boolean).join(" ");

  return `
    <button class="${classes}" data-set-day="${day}" type="button">
      <img class="game-day-button-icon" src="${visuals.icon}" alt="">
      <span class="game-day-button-copy">
        <strong>Day ${day}</strong>
        <small>${config.goal}</small>
      </span>
    </button>
  `;
}

function sceneAssetFor(page, day) {
  const visuals = getDayVisuals(day);
  if (page === "deck" || page === "completion") return visuals.cardArt;
  return visuals.icon;
}

function renderEnergy(container, items) {
  if (!container) return;
  container.innerHTML = items.map((item) => `
    <span class="game-energy-item">
      <img src="${ICONS[item.icon] || ICONS.energy}" alt="">
      ${item.text}
    </span>
  `).join("");
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element && value !== undefined) element.textContent = value;
}

function setHTML(selector, value) {
  const element = document.querySelector(selector);
  if (element && value !== undefined) element.innerHTML = value;
}

function ensureElement(parent, selector, tagName, className, beforeSelector = null) {
  if (!parent) return null;

  let element = parent.querySelector(selector);
  if (element) return element;

  element = document.createElement(tagName);

  if (selector.startsWith("#")) {
    element.id = selector.slice(1);
  } else if (selector.startsWith(".")) {
    element.className = selector.slice(1);
  }

  if (className) {
    element.className = className;
  }

  const beforeNode = beforeSelector ? parent.querySelector(beforeSelector) : null;
  if (beforeNode) {
    parent.insertBefore(element, beforeNode);
  } else {
    parent.appendChild(element);
  }

  return element;
}

function renderPageHeader(config, page) {
  setText("#page-eyebrow", `${page.toUpperCase()} · DAY ${config.day}`);
  setText("#page-title", config.pageNames[page] || config.pageNames.lobby);
}

function buildDaySelector(state) {
  const buttons = Object.values(DAY_CONFIG).map((config) => dayButtonMarkup(config.day, state)).join("");

  document.querySelectorAll("#day-selector-title").forEach((element) => {
    element.innerHTML = `${badgeMarkup(state.currentDay)}目前展示 Day ${state.currentDay}｜${getDayConfig(state.currentDay).goal}`;
  });

  document.querySelectorAll("#day-selector-text").forEach((element) => {
    element.textContent = getDayConfig(state.currentDay).summary;
  });

  document.querySelectorAll("#day-selector-buttons").forEach((element) => {
    element.innerHTML = buttons;
  });
}

function renderDaySelector(state) {
  buildDaySelector(state);
}

function renderSideStatus(state, config, dayState) {
  const statusItems = document.querySelector("#game-side-status");
  if (!statusItems) return;
  statusItems.innerHTML = [
    `Day ${config.day} 進度：${completedMissionCount(dayState)} / ${dayState.missions.length}`,
    `已完成天數：${completedDayCount(state)} / 7`,
    dayState.rewardClaimed ? `今日收尾：Day ${config.day} 已領取完成獎勵` : `今日收尾：${rewardReady(dayState) ? "可前往獎勵頁" : "尚未達成三項任務"}`,
    `推薦動作：${nextRecommendation(state, config, dayState)}`
  ].map((line) => `<li>${line}</li>`).join("");
}

function renderOpsBar(state, config, dayState) {
  const shell = document.querySelector(".game-shell");
  const selector = document.querySelector(".game-day-selector");
  if (!shell || !selector) return;

  const meta = getDayMeta(config.day);
  const bar = ensureElement(shell, "#game-opsbar", "section", "game-opsbar");
  selector.insertAdjacentElement("afterend", bar);

  const cards = [
    {
      label: "CURRENT CHAPTER",
      value: `Day ${config.day} · ${meta.chapter}`,
      copy: `${meta.rank} · ${meta.arena}`
    },
    {
      label: "MISSION RATE",
      value: `${completedMissionCount(dayState)} / ${dayState.missions.length}`,
      copy: `完成度 ${completionPercent(dayState)}%`
    },
    {
      label: "NEXT UNLOCK",
      value: config.tomorrowUnlock,
      copy: rewardReady(dayState) ? "已達成收尾條件" : "完成今天三項任務後解鎖"
    },
    {
      label: "LIVE OPS",
      value: meta.liveOps,
      copy: meta.notice
    }
  ];

  bar.innerHTML = cards.map((item) => `
    <article class="game-ops-card">
      <span class="game-ops-label">${item.label}</span>
      <strong class="game-ops-value">${item.value}</strong>
      <p class="game-ops-copy">${item.copy}</p>
    </article>
  `).join("");
}

function renderSidebarModules(state, config, dayState) {
  const sidebar = document.querySelector(".game-sidebar");
  if (!sidebar) return;

  const meta = getDayMeta(config.day);
  const chapterCard = ensureElement(sidebar, "#game-side-chapter", "section", "game-side-card game-side-module", "#game-toast");
  const inboxCard = ensureElement(sidebar, "#game-side-inbox", "section", "game-side-card game-side-module", "#game-toast");

  chapterCard.innerHTML = `
    <span class="eyebrow">CHAPTER DATA</span>
    <strong>Day ${config.day} · ${meta.chapter}</strong>
    <ul class="game-side-module-list">
      <li>場域：${meta.arena}</li>
      <li>目前等級：${meta.rank}</li>
      <li>隊列狀態：${meta.liveOps}</li>
    </ul>
  `;

  inboxCard.innerHTML = `
    <span class="eyebrow">SYSTEM NOTICE</span>
    <strong>${rewardReady(dayState) ? "今日已可收尾" : "下一步提醒"}</strong>
    <p>${nextRecommendation(state, config, dayState)}</p>
    <p>${meta.notice}</p>
  `;
}

function renderCommon(state, config, dayState, flash) {
  document.body.dataset.day = String(config.day);
  renderDaySelector(state);
  renderPageHeader(config, document.body.dataset.page);
  renderSideStatus(state, config, dayState);
  renderOpsBar(state, config, dayState);
  renderSidebarModules(state, config, dayState);

  document.querySelectorAll(".game-scene-icon img").forEach((image) => {
    image.setAttribute("src", sceneAssetFor(document.body.dataset.page, config.day));
    image.setAttribute("alt", `Day ${config.day} 視覺`);
  });

  const toast = document.querySelector("#game-toast");
  if (toast) {
    toast.textContent = flash?.message || toastFor(document.body.dataset.page, config, state, dayState);
    toast.classList.toggle("is-highlight", Boolean(flash));
  }

  const progress = document.querySelector("#game-progress");
  if (progress) {
    progress.innerHTML = Object.values(DAY_CONFIG).map((item) => {
      const itemState = getDayState(state, item.day);
      let className = "";
      if (itemState.rewardClaimed) className = "is-done";
      if (item.day === state.currentDay) className = "is-current";
      return `<span class="${className}">${item.day}</span>`;
    }).join("");
  }
}

function renderHome(config, dayState) {
  const meta = getDayMeta(config.day);
  const visuals = getDayVisuals(config.day);
  const hero = document.querySelector(".game-hero");
  if (hero) {
    hero.classList.add("game-home-hero");
    hero.innerHTML = `
      <div class="game-home-copy">
        <p class="eyebrow">${config.home.eyebrow}</p>
        <h2>${config.home.title}</h2>
        <p>${config.home.text}</p>
        <div class="game-home-chip-row">
          <span class="game-chip is-gold">${meta.chapter}</span>
          <span class="game-chip">${meta.rank}</span>
          <span class="game-chip">${meta.arena}</span>
        </div>
        <div class="game-home-metric-row">
          <article class="game-mini-card">
            <span class="game-stat-label">TODAY GOAL</span>
            <strong>${config.goal}</strong>
            <p>把今天的三項主線任務收斂到同一個學習目標。</p>
          </article>
          <article class="game-mini-card">
            <span class="game-stat-label">CLEAR RATE</span>
            <strong>${completionPercent(dayState)}%</strong>
            <p>目前進度 ${completedMissionCount(dayState)} / ${dayState.missions.length}，完成後就能推進到下一天。</p>
          </article>
        </div>
        <div class="game-top-actions">
          <a class="game-button" href="${projectPage("lobby.html")}">進入新手大廳</a>
          <a class="game-button-ghost" href="${projectPage("missions.html")}">直接看任務頁</a>
        </div>
      </div>
      <div class="game-home-shot">
        <div class="game-home-shot-frame">
          <div class="game-home-shot-header">
            <span class="game-chip is-gold">Hero Preview</span>
            <span class="game-chip">${meta.battleLabel}</span>
          </div>
          <div class="game-home-shot-stage">
            <div class="game-home-stage-copy">
              <span class="eyebrow">Prototype Scene</span>
              <strong>${config.pageNames.lobby}</strong>
              <p>${meta.notice}</p>
            </div>
            <article class="game-home-stage-card">
              <img class="game-card-art" src="${visuals.cardArt}" alt="">
              <span class="game-rarity game-rarity-epic">${visuals.badge}</span>
              <strong>${config.deck.featuredCard.name}</strong>
              <p>${config.deck.featuredCard.role}</p>
            </article>
          </div>
          <div class="game-home-shot-footer">
            <div>
              <span class="game-stat-label">NEXT DROP</span>
              <strong>${config.tomorrowUnlock}</strong>
            </div>
            <div>
              <span class="game-stat-label">LIVE SCORE</span>
              <strong>${meta.battleScore}</strong>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  const overview = document.querySelector("#home-overview");
  if (overview) {
    overview.innerHTML = config.home.actions.map((item) => `
      <article class="game-side-card">
        <span class="eyebrow">${item.eyebrow}</span>
        <strong>${item.title}</strong>
        <p>${item.text}</p>
      </article>
    `).join("");
  }

  const dashboard = document.querySelector("#home-dashboard");
  if (dashboard) {
    dashboard.innerHTML = [
      {
        eyebrow: "TODAY FOCUS",
        title: config.goal,
        text: config.summary
      },
      {
        eyebrow: "MAIN REWARD",
        title: config.missions.map((mission) => mission.reward).join(" / "),
        text: "今天完成三項任務後，這些獎勵會一起把玩家推進到下一步。"
      },
      {
        eyebrow: "NEXT UNLOCK",
        title: config.tomorrowUnlock,
        text: "我會讓今天的收尾自然接到明天的內容，而不是突然切斷。"
      }
    ].map((item) => `
      <article class="game-highlight-card">
        <span class="eyebrow">${item.eyebrow}</span>
        <strong>${item.title}</strong>
        <p>${item.text}</p>
      </article>
    `).join("");
  }
}

function renderLobby(config) {
  const meta = getDayMeta(config.day);
  renderEnergy(document.querySelector("#player-energy"), config.player.resources);
  setHTML("#player-card-title", inlineTitleMarkup(config.player.title, config.day));
  setText("#player-card-text", config.player.subtitle);
  setHTML("#lobby-scene-label", `${badgeMarkup(config.day)}${config.lobby.sceneLabel}`);
  setText("#lobby-scene-title", config.lobby.strong);
  setText("#lobby-scene-text", config.lobby.text);
  setText("#lobby-header-title", config.lobby.header);
  setText("#lobby-primary-label", config.lobby.primaryLabel);
  document.querySelector("#lobby-primary-link")?.setAttribute("href", normalizePageHref(config.lobby.primaryHref));
  setText("#lobby-secondary-label", config.lobby.secondaryLabel);
  document.querySelector("#lobby-secondary-link")?.setAttribute("href", normalizePageHref(config.lobby.secondaryHref));

  const stats = document.querySelector("#lobby-stats");
  if (stats) {
    stats.innerHTML = config.lobby.stats.map((item) => `
      <article class="game-mini-card">
        <span class="game-stat-label">${item.label}</span>
        <strong>${item.value}</strong>
        <p>${item.description}</p>
      </article>
    `).join("");
  }

  const detailGrid = document.querySelector("#lobby-detail-grid");
  if (detailGrid) {
    detailGrid.innerHTML = [
      {
        eyebrow: "SYSTEM TAGS",
        title: `Day ${config.day} 的系統焦點`,
        body: `<ul><li>今日核心：${config.goal}</li><li>明日解鎖：${config.tomorrowUnlock}</li><li>主打頁面：${config.pageNames.deck}</li></ul>`
      },
      {
        eyebrow: "PLAYER LOOP",
        title: "今天的玩家流程",
        body: `<ul><li>先進任務頁看主線</li><li>再去 ${config.pageNames.battle} 理解今天的回饋</li><li>最後在 ${config.pageNames.completion} 收尾並推進下一天</li></ul>`
      },
      {
        eyebrow: "RETENTION NOTE",
        title: "設計上要留住玩家的點",
        body: `<p>${meta.notice}</p>`
      }
    ].map((item) => `
      <article class="game-highlight-card">
        <span class="eyebrow">${item.eyebrow}</span>
        <strong>${item.title}</strong>
        ${item.body}
      </article>
    `).join("");
  }

  const panel = document.querySelector(".game-panel");
  const commandGrid = ensureElement(panel, "#lobby-command-grid", "section", "game-command-grid", "#lobby-detail-grid");
  if (commandGrid) {
    commandGrid.innerHTML = [
      {
        label: "TODAY LOOP",
        value: `${config.pageNames.missions} -> ${config.pageNames.battle}`,
        text: "先用任務頁對焦，再用戰鬥 / 組牌頁把今天的理解做成可見結果。"
      },
      {
        label: "SHOWCASE ANGLE",
        value: meta.chapter,
        text: "這一天最適合 demo 的重點，是它如何把今天的設計目標收斂成一條簡單流程。"
      },
      {
        label: "UNLOCK STATUS",
        value: config.tomorrowUnlock,
        text: "大廳要同時交代今天的任務與明天的期待，才會像真正的留存入口。"
      }
    ].map((item) => `
      <article class="game-command-card">
        <span class="game-stat-label">${item.label}</span>
        <strong>${item.value}</strong>
        <p>${item.text}</p>
      </article>
    `).join("");
  }
}

function renderMissionPage(config, dayState) {
  const meta = getDayMeta(config.day);
  renderEnergy(document.querySelector("#player-energy"), config.missionPage.resources);
  setHTML("#player-card-title", inlineTitleMarkup(config.missionPage.playerStrong, config.day));
  setText("#player-card-text", config.missionPage.playerText);
  setHTML("#missions-scene-label", `${badgeMarkup(config.day)}${config.missionPage.sceneLabel}`);
  setText("#missions-scene-title", config.missionPage.strong);
  setText("#missions-scene-text", config.missionPage.text);
  setText("#missions-header-title", config.missionPage.header);
  setText("#missions-primary-label", config.missionPage.primaryLabel);
  document.querySelector("#missions-primary-link")?.setAttribute("href", normalizePageHref(config.missionPage.primaryHref));
  setText("#missions-secondary-label", config.missionPage.secondaryLabel);
  document.querySelector("#missions-secondary-link")?.setAttribute("href", normalizePageHref(config.missionPage.secondaryHref));

  const panel = document.querySelector(".game-panel");
  const commandGrid = ensureElement(panel, "#mission-command-grid", "section", "game-command-grid", "#mission-list");
  if (commandGrid) {
    commandGrid.innerHTML = [
      {
        label: "MISSION RATE",
        value: `${completionPercent(dayState)}%`,
        text: `目前已完成 ${completedMissionCount(dayState)} / ${dayState.missions.length} 項任務。`
      },
      {
        label: "TODAY CHAPTER",
        value: meta.chapter,
        text: `今天的目標是「${config.goal}」，所有任務都應該指向同一個學習核心。`
      },
      {
        label: "REWARD READY",
        value: unlockStateLabel(config, dayState),
        text: rewardReady(dayState) ? "現在可以直接去完成頁收尾。" : `收尾後將解鎖：${config.tomorrowUnlock}`
      }
    ].map((item) => `
      <article class="game-command-card">
        <span class="game-stat-label">${item.label}</span>
        <strong>${item.value}</strong>
        <p>${item.text}</p>
      </article>
    `).join("");
  }

  const missionBanner = ensureElement(panel, "#mission-banner", "section", "game-banner-card", "#mission-list");
  if (missionBanner) {
    missionBanner.innerHTML = `
      <div class="game-banner-copy">
        <span class="eyebrow">${meta.featuredMode}</span>
        <strong>${meta.bannerTitle}</strong>
        <p>${meta.bannerText}</p>
      </div>
      <div class="game-banner-meta">
        <span class="game-route-chip">${meta.liveOps}</span>
        <span class="game-route-chip">${meta.enemyName}</span>
        <span class="game-route-chip">${config.tomorrowUnlock}</span>
      </div>
    `;
  }

  const missionContainer = document.querySelector("#mission-list");
  if (missionContainer) {
    missionContainer.innerHTML = mergedMissions(config, dayState).map((mission, index) => {
      const percentage = Math.min((mission.current / mission.total) * 100, 100);
      const status = missionStatus(mission);
      const chipClass = status === "已完成" ? "game-chip is-complete" : "game-chip";
      return `
        <article class="game-mission-card" data-mission-id="${mission.id}">
          <div class="game-mission-topline">
            <span class="game-icon-badge"><img src="${getDayVisuals(config.day).icon}" alt=""></span>
            <span class="eyebrow">${missionTone(index)}</span>
          </div>
          <div class="game-mission-head">
            <strong>${mission.title}</strong>
            <span class="${chipClass}">${status}</span>
          </div>
          <p>${mission.description}</p>
          <div class="game-progressbar"><span style="width: ${percentage}%"></span></div>
          <div class="game-stat-row">
            <span>進度 ${mission.current} / ${mission.total}</span>
            <span>獎勵 ${mission.reward}</span>
          </div>
          <div class="game-mission-footer">
            <button class="game-mini-action" data-complete-mission="${mission.id}" type="button" ${mission.current >= mission.total ? "disabled" : ""}>
              ${mission.current >= mission.total ? "已完成" : mission.ctaLabel}
            </button>
          </div>
        </article>
      `;
    }).join("");
  }

  const highlightRoot = document.querySelector("#mission-highlights");
  if (highlightRoot) {
    highlightRoot.innerHTML = config.missionPage.highlights.map((item) => `
      <article class="game-highlight-card">
        <span class="eyebrow">${item.eyebrow}</span>
        <strong>${item.title}</strong>
        <p>${item.text}</p>
      </article>
    `).join("");
  }

  const rewardTrack = document.querySelector("#mission-reward-track");
  if (rewardTrack) {
    rewardTrack.innerHTML = mergedMissions(config, dayState).map((mission, index) => `
      <article class="game-highlight-card game-reward-track-card">
        <span class="eyebrow">REWARD TRACK</span>
        <strong>${mission.reward}</strong>
        <p>${mission.title}</p>
        ${index === 0 ? `<img class="game-card-art" src="${getDayVisuals(config.day).cardArt}" alt="">` : ""}
      </article>
    `).join("");
  }
}

function renderBattlePage(config) {
  const meta = getDayMeta(config.day);
  renderEnergy(document.querySelector("#player-energy"), config.battle.resources);
  setHTML("#player-card-title", inlineTitleMarkup(config.battle.playerStrong, config.day));
  setText("#player-card-text", config.battle.playerText);
  setHTML("#battle-scene-label", `${badgeMarkup(config.day)}${config.battle.sceneLabel}`);
  setText("#battle-scene-title", config.battle.strong);
  setText("#battle-scene-text", config.battle.text);
  setText("#battle-header-title", config.battle.header);
  setText("#battle-primary-label", config.battle.primaryLabel);
  setText("#battle-secondary-label", config.battle.secondaryLabel);
  document.querySelector("#battle-secondary-link")?.setAttribute("href", normalizePageHref(config.battle.secondaryHref));

  const panel = document.querySelector(".game-panel");
  const statusGrid = ensureElement(panel, "#battle-status-grid", "section", "game-battle-status-grid", "#battle-cards");
  if (statusGrid) {
    statusGrid.innerHTML = [
      {
        label: "MATCH LABEL",
        value: meta.battleLabel,
        text: `戰場 ${meta.arena}`
      },
      {
        label: "CURRENT SCORE",
        value: meta.battleScore,
        text: battleResultTone(meta.battleScore)
      },
      {
        label: "NEXT FIX",
        value: config.pageNames.deck,
        text: "把目前的問題轉成清楚的補強方向與推薦動作。"
      },
      {
        label: "DESIGN RULE",
        value: "結果要導向下一步",
        text: "戰鬥頁不能只是輸贏，而要明確說明玩家現在能怎麼辦。"
      }
    ].map((item, index) => `
      <article class="game-battle-status-card ${index === 1 ? "is-hot" : ""}">
        <span class="game-stat-label">${item.label}</span>
        <strong>${item.value}</strong>
        <p>${item.text}</p>
      </article>
    `).join("");
  }

  const battleIntel = ensureElement(panel, "#battle-intel-grid", "section", "game-battle-intel-grid", "#battle-cards");
  if (battleIntel) {
    battleIntel.innerHTML = [
      {
        label: "OPPONENT",
        value: meta.enemyName,
        text: "把今天的對手與情境寫清楚，戰報頁看起來才更像真的模式入口。"
      },
      {
        label: "MODE",
        value: meta.featuredMode,
        text: meta.bannerText
      },
      {
        label: "OUTCOME",
        value: battleResultTone(meta.battleScore),
        text: "這裡不是只有結果，而是要把結果翻成下一個可行動的方向。"
      }
    ].map((item) => `
      <article class="game-battle-intel-card">
        <span class="game-stat-label">${item.label}</span>
        <strong>${item.value}</strong>
        <p>${item.text}</p>
      </article>
    `).join("");
  }

  const cards = document.querySelector("#battle-cards");
  if (cards) {
    cards.innerHTML = config.battle.cards.map((item) => `
      <article class="game-highlight-card">
        <span class="eyebrow">${item.eyebrow}</span>
        <strong>${item.title}</strong>
        <p>${item.text}</p>
      </article>
    `).join("");
  }

  const steps = document.querySelector("#battle-steps");
  if (steps) {
    steps.innerHTML = config.battle.steps.map((item) => `<li>${item}</li>`).join("");
  }

  const reportGrid = document.querySelector("#battle-report-grid");
  if (reportGrid) {
    reportGrid.innerHTML = [
      {
        eyebrow: "MATCH STATUS",
        title: meta.battleLabel,
        text: `場域 ${meta.arena} · 目前數值 ${meta.battleScore}。在 Day ${config.day}，這頁的功能是把玩家從「結果」推回「下一步行動」。`
      },
      {
        eyebrow: "NEXT FIX",
        title: "會被帶去的頁面",
        text: `${config.pageNames.deck} 是這頁最重要的後續節點，因為它會把今天的問題翻成具體調整。`
      },
      {
        eyebrow: "DESIGN RULE",
        title: "設計原則",
        text: "戰鬥回饋不能只有輸贏，而要讓玩家知道今天差在哪裡、現在能補什麼。"
      }
    ].map((item) => `
      <article class="game-highlight-card">
        <span class="eyebrow">${item.eyebrow}</span>
        <strong>${item.title}</strong>
        <p>${item.text}</p>
      </article>
    `).join("");
  }

  reportGrid?.insertAdjacentHTML("beforeend", `
    <article class="game-highlight-card game-battle-timeline">
      <span class="eyebrow">ROUND TIMELINE</span>
      <strong>今天的推進順序</strong>
      <ul class="game-timeline-list">
        ${config.battle.steps.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </article>
  `);
}

function renderDeckPage(config, dayState) {
  const meta = getDayMeta(config.day);
  const visuals = getDayVisuals(config.day);
  const powerAfter = deckPowerEstimate(config, dayState);
  const powerBefore = Math.max(powerAfter - (60 + config.day * 8), 180);
  renderEnergy(document.querySelector("#player-energy"), config.deck.resources);
  setHTML("#player-card-title", inlineTitleMarkup(config.deck.playerStrong, config.day));
  setText("#player-card-text", config.deck.playerText);
  setHTML("#deck-scene-label", `${badgeMarkup(config.day)}${config.deck.sceneLabel}`);
  setText("#deck-scene-title", config.deck.strong);
  setText("#deck-scene-text", config.deck.text);
  setText("#deck-header-title", config.deck.header);
  setText("#deck-primary-label", config.deck.primaryLabel);
  setText("#deck-secondary-label", config.deck.secondaryLabel);
  document.querySelector("#deck-secondary-link")?.setAttribute("href", normalizePageHref(config.deck.secondaryHref));
  setText("#deck-name", config.deck.deckName);
  setText("#deck-description", config.deck.deckDescription);
  setText("#featured-card-name", config.deck.featuredCard.name);
  setText("#featured-card-role", config.deck.featuredCard.role);
  setText("#featured-card-rarity", config.deck.featuredCard.rarity);
  document.querySelector("#featured-card-art")?.setAttribute("src", visuals.cardArt);
  setText("#deck-replace-note", config.deck.replaceNote);

  const hasDoneDeckAction = (config.deck.actionMissionIds || []).every((missionId) => {
    const mission = getMissionProgress(dayState, missionId);
    return mission && mission.current >= mission.total;
  });

  const panel = document.querySelector(".game-panel");
  const compareGrid = ensureElement(panel, "#deck-compare-grid", "section", "game-compare-grid", "#deck-grid");
  if (compareGrid) {
    compareGrid.innerHTML = `
      <article class="game-compare-card">
        <span class="game-stat-label">BEFORE SYNC</span>
        <strong>牌組戰力 ${powerBefore}</strong>
        <p>補強前的牌組較像原型版本，功能存在但缺少今天的核心修正。</p>
      </article>
      <article class="game-compare-arrow">
        <span>SYNC</span>
      </article>
      <article class="game-compare-card is-highlight">
        <span class="game-stat-label">AFTER SYNC</span>
        <strong>牌組戰力 ${powerAfter}</strong>
        <p>${hasDoneDeckAction ? "目前已套用今天的推薦牌組，展示時可直接切回戰鬥頁驗證。" : "完成這一步後，就能更合理地把玩家送去戰鬥驗證或收尾。"}</p>
      </article>
    `;
  }

  const deckModeGrid = ensureElement(panel, "#deck-mode-grid", "section", "game-command-grid", "#deck-grid");
  if (deckModeGrid) {
    deckModeGrid.innerHTML = [
      {
        label: "FEATURED MODE",
        value: meta.featuredMode,
        text: `這個組牌頁在 Day ${config.day} 的角色是把今天的學習重點具體化。`
      },
      {
        label: "PREFERRED BUILD",
        value: meta.deckChoices[0],
        text: "主展示路線會保留給最能講清楚今天設計目的的套牌。"
      },
      {
        label: "DEMO ANGLE",
        value: hasDoneDeckAction ? "已完成同步" : "等待展示同步",
        text: hasDoneDeckAction ? "現在很適合切到戰鬥或完成頁，展示調整後的結果。" : "完成同步後，這一天的流程就會從牌組切回結果驗證。"
      }
    ].map((item) => `
      <article class="game-command-card">
        <span class="game-stat-label">${item.label}</span>
        <strong>${item.value}</strong>
        <p>${item.text}</p>
      </article>
    `).join("");
  }

  const deckGrid = document.querySelector("#deck-grid");
  if (deckGrid) {
    deckGrid.innerHTML = config.deck.slots.map((slot) => `
      <article class="deck-slot ${slot.highlight ? "is-highlight" : ""}">
        ${slot.highlight ? `<img class="game-card-art" src="${visuals.cardArt}" alt="">` : `<div class="deck-portrait"></div>`}
        ${slot.highlight ? `<span class="game-rarity game-rarity-epic">${config.deck.featuredCard.rarity}</span>` : ""}
        <strong>${slot.name}</strong>
        <p>${slot.role}</p>
      </article>
    `).join("");
  }

  setText("#deck-status-text", hasDoneDeckAction ? config.deck.statusDone : config.deck.statusPending);

  const detailGrid = document.querySelector("#deck-detail-grid");
  if (detailGrid) {
    detailGrid.innerHTML = [
      {
        eyebrow: "FEATURE CARD",
        title: config.deck.featuredCard.name,
        text: `這張卡在 Day ${config.day} 的功能是：${config.deck.featuredCard.role}。`
      },
      {
        eyebrow: "DECK REASON",
        title: "今天為什麼推這套",
        text: config.deck.replaceNote
      },
      {
        eyebrow: "NEXT STEP",
        title: hasDoneDeckAction ? "牌組已同步完成" : "完成同步後再往下走",
        text: hasDoneDeckAction
          ? `現在玩家可以回到 ${config.pageNames.battle} 或 ${config.pageNames.completion}，把今天流程收尾。`
          : `這一步完成後，今天的主線才會真正接到 ${config.pageNames.battle}。`
      }
    ].map((item) => `
      <article class="game-highlight-card">
        <span class="eyebrow">${item.eyebrow}</span>
        <strong>${item.title}</strong>
        <p>${item.text}</p>
      </article>
    `).join("");

    detailGrid.insertAdjacentHTML("beforeend", `
      <article class="game-highlight-card game-deck-choices">
        <span class="eyebrow">ARCHETYPE OPTIONS</span>
        <strong>今天可展示的流派方向</strong>
        <div class="game-choice-grid">
          ${meta.deckChoices.map((choice, index) => `
            <div class="game-choice-card ${index === 0 ? "is-active" : ""}">
              <span class="game-stat-label">${index === 0 ? "RECOMMENDED" : "OPTION"}</span>
              <strong>${choice}</strong>
              <p>${index === 0 ? "這張卡與今天任務的關聯最直接，適合 demo 時主打。" : "可當作替代展示，讓面試官看到你有做不同路線思考。"}</p>
            </div>
          `).join("")}
        </div>
      </article>
    `);
  }
}

function renderCompletionPage(config, dayState) {
  const meta = getDayMeta(config.day);
  const visuals = getDayVisuals(config.day);
  renderEnergy(document.querySelector("#player-energy"), config.completion.resources);
  setHTML("#player-card-title", inlineTitleMarkup(config.completion.playerStrong, config.day));
  setText("#player-card-text", config.completion.playerText);
  setHTML("#completion-scene-label", `${badgeMarkup(config.day)}${config.completion.sceneLabel}`);
  setText("#completion-scene-title", config.completion.strong);
  setText("#completion-scene-text", config.completion.text);
  setText("#completion-lock-title", config.completion.lockTitle);
  setText("#completion-lock-text", config.completion.lockText);
  setText("#completion-header-title", config.completion.header);
  setText("#completion-primary-label", dayState.rewardClaimed ? "已領取本日獎勵" : config.completion.claimLabel);

  const ready = rewardReady(dayState);
  const locked = document.querySelector("#completion-locked");
  const content = document.querySelector("#completion-ready");
  if (locked && content) {
    locked.hidden = ready;
    content.hidden = !ready;
  }

  const claimButton = document.querySelector("#completion-primary-action");
  if (claimButton) {
    claimButton.disabled = dayState.rewardClaimed || !ready;
  }

  const rewards = document.querySelector("#completion-rewards");
  if (rewards) {
    rewards.innerHTML = config.completion.rewards.map((item, index) => `
      <article class="game-reward-card ${index === 0 || item.epic ? "is-epic" : ""}">
        ${index === 0 || item.epic ? `<img class="game-card-art" src="${visuals.cardArt}" alt=""><span class="game-rarity game-rarity-epic">${getDayVisuals(config.day).badge}</span>` : ""}
        <strong>${item.title}</strong>
        <p>${item.text}</p>
      </article>
    `).join("");
  }

  const readyRoot = document.querySelector("#completion-ready");
  if (readyRoot) {
    const ceremony = ensureElement(readyRoot, "#completion-ceremony", "section", "game-ceremony");
    readyRoot.prepend(ceremony);
    ceremony.innerHTML = `
      <div class="game-ceremony-copy">
        <span class="eyebrow">DAY CLEAR CEREMONY</span>
        <strong>${dayState.rewardClaimed ? "已完成今日收尾" : `準備領取 Day ${config.day} 獎勵`}</strong>
        <p>${meta.notice}</p>
      </div>
      <div class="game-ceremony-routes">
        <span class="game-route-chip">${meta.chapter}</span>
        <span class="game-route-chip">${config.tomorrowUnlock}</span>
        <span class="game-route-chip">${dayState.rewardClaimed ? "已切往下一天" : "待領取獎勵"}</span>
      </div>
    `;
  }

  const seal = ensureElement(readyRoot, "#completion-seal", "section", "game-seal-card", "#completion-rewards");
  if (seal) {
    seal.innerHTML = `
      <div class="game-seal-emblem">${meta.sealLabel}</div>
      <div class="game-seal-copy">
        <span class="eyebrow">${meta.featuredMode}</span>
        <strong>${meta.bannerTitle}</strong>
        <p>${meta.bannerText}</p>
      </div>
    `;
  }

  const routes = document.querySelector("#completion-routes");
  if (routes) {
    routes.innerHTML = config.completion.routes.map((item) => `
      <article class="game-mini-card">
        <span class="game-stat-label">${item.label}</span>
        <strong>${item.value}</strong>
        <p>${item.text}</p>
      </article>
    `).join("");
  }

  const nextGrid = ensureElement(readyRoot, "#completion-next-grid", "section", "game-next-grid", "#completion-routes");
  if (nextGrid) {
    nextGrid.innerHTML = [
      {
        label: "RETURN HUB",
        title: config.pageNames.lobby,
        text: "回到大廳可以示範這一天完成後，首頁與導覽如何變成下一天的入口。",
        href: projectPage("lobby.html")
      },
      {
        label: "NEXT DAY",
        title: dayState.rewardClaimed ? "繼續展示下一天" : config.tomorrowUnlock,
        text: dayState.rewardClaimed ? "今天已經收尾完成，現在可直接切去下一天繼續 demo。" : "這是收尾之後最重要的下一步期待。",
        href: projectPage("missions.html")
      },
      {
        label: "PORTFOLIO MODE",
        title: "回作品集入口",
        text: "若你要從整份作品集導覽切進來，這裡能接回首頁主展示。",
        href: PORTFOLIO_BASE
      }
    ].map((item) => `
      <a class="game-next-card" href="${normalizePageHref(item.href)}">
        <span class="game-stat-label">${item.label}</span>
        <strong>${item.title}</strong>
        <p>${item.text}</p>
      </a>
    `).join("");
  }

  const unlockGrid = document.querySelector("#completion-unlock-grid");
  if (unlockGrid) {
    unlockGrid.innerHTML = [
      {
        eyebrow: "DAY CLEAR",
        title: `Day ${config.day} 已收尾`,
        text: `今天的主題是「${config.goal}」，完成後就會開始往「${config.tomorrowUnlock}」推進。`
      },
      {
        eyebrow: "LONG LOOP",
        title: "收尾不是句點",
        text: "完成頁除了發獎，還要把玩家送進下一天或長期玩法，讓 onboarding 真正接到主循環。"
      },
      {
        eyebrow: "PROGRAM STATE",
        title: dayState.rewardClaimed ? "本日獎勵已領取" : "本日獎勵待領取",
        text: dayState.rewardClaimed
          ? "你現在可以切去其他天數回看整套流程，或繼續往下一天展示。"
          : "今天的三項任務達成後，這裡會作為正式收尾節點。"
      }
    ].map((item) => `
      <article class="game-highlight-card">
        <span class="eyebrow">${item.eyebrow}</span>
        <strong>${item.title}</strong>
        <p>${item.text}</p>
      </article>
    `).join("");
  }
}

function attachActionHandlers(state, config) {
  document.querySelectorAll("[data-reset-flow]").forEach((button) => {
    button.addEventListener("click", () => {
      resetState();
      window.location.href = projectPage("index.html");
    });
  });

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.nav === document.body.dataset.page);
  });

  document.querySelectorAll("[data-set-day]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextDay = Number(button.dataset.setDay);
      const newState = loadState();
      newState.currentDay = nextDay;
      saveState(newState);
      setFlash({
        message: `已切換到 Day ${nextDay}，現在可以直接檢視這一天的任務與介面。`,
        effect: "success"
      });
      window.location.reload();
    });
  });

  document.querySelectorAll("[data-complete-mission]").forEach((button) => {
    button.addEventListener("click", () => {
      const latest = loadState();
      completeMission(latest, latest.currentDay, button.dataset.completeMission);
      saveState(latest);
      setFlash({
        missionId: button.dataset.completeMission,
        message: `Day ${latest.currentDay} 任務已推進：${button.textContent.trim()}。`,
        effect: getDayVisuals(latest.currentDay).progressEffect
      });
      window.location.reload();
    });
  });

  const battleActionButton = document.querySelector("#battle-primary-action");
  if (battleActionButton && config.battle.primaryAction) {
    battleActionButton.addEventListener("click", () => {
      const latest = loadState();
      (config.battle.actionMissionIds || []).forEach((missionId) => completeMission(latest, latest.currentDay, missionId));
      saveState(latest);
      setFlash({
        message: `Day ${latest.currentDay} 的戰鬥回饋已推進，今天的戰鬥節點已完成。`,
        effect: getDayVisuals(latest.currentDay).progressEffect
      });
      window.location.reload();
    });
  }

  const deckActionButton = document.querySelector("#deck-primary-action");
  if (deckActionButton && config.deck.primaryAction) {
    deckActionButton.addEventListener("click", () => {
      const latest = loadState();
      (config.deck.actionMissionIds || []).forEach((missionId) => completeMission(latest, latest.currentDay, missionId));
      saveState(latest);
      setFlash({
        message: `Day ${latest.currentDay} 的牌組 / 同步節點已完成，系統已更新今天的進度。`,
        effect: getDayVisuals(latest.currentDay).progressEffect
      });
      window.location.reload();
    });
  }

  const claimButton = document.querySelector("#completion-primary-action");
  if (claimButton) {
    claimButton.addEventListener("click", () => {
      const latest = loadState();
      const dayState = getDayState(latest, latest.currentDay);
      if (!rewardReady(dayState)) return;

      dayState.rewardClaimed = true;

      if (latest.currentDay < 7) {
        latest.currentDay += 1;
      } else {
        latest.finished = true;
      }

      saveState(latest);
      setFlash({
        message: latest.finished
          ? "新手七日流程已完整畢業，現在可以直接拿這整套當面試主打作品。"
          : `Day ${latest.currentDay - 1} 已收尾完成，已為你切換到 Day ${latest.currentDay}。`,
        effect: latest.finished ? "crown" : getDayVisuals(Math.max(1, latest.currentDay - 1)).completionEffect
      });
      window.location.reload();
    });
  }
}

function renderShared() {
  const page = document.body.dataset.page;
  let state = loadState();
  const config = getDayConfig(state.currentDay);
  const dayState = getDayState(state, state.currentDay);
  const flash = consumeFlash();

  requestAnimationFrame(() => {
    document.body.classList.add("is-loaded");
  });

  renderCommon(state, config, dayState, flash);

  if (page === "home") renderHome(config, dayState);
  if (page === "lobby") renderLobby(config);
  if (page === "missions") renderMissionPage(config, dayState);
  if (page === "battle") renderBattlePage(config);
  if (page === "deck") renderDeckPage(config, dayState);
  if (page === "completion") renderCompletionPage(config, dayState);

  if (flash?.missionId) {
    const flashedMission = document.querySelector(`[data-mission-id="${flash.missionId}"]`);
    flashedMission?.classList.add("is-flash");
  }

  if (flash?.effect) {
    const counts = {
      dawn: 14,
      sunrise: 24,
      ember: 16,
      aegis: 22,
      growth: 18,
      ascend: 24,
      gust: 18,
      cyclone: 26,
      gift: 20,
      festival: 28,
      rank: 20,
      impact: 28,
      legend: 22,
      crown: 32
    };
    emitSparks(flash.effect, counts[flash.effect] || 18);
  }

  attachActionHandlers(state, config);
}

function showRenderError(error) {
  console.error("Project 01 render failed:", error);

  const panel = document.createElement("section");
  panel.setAttribute("role", "alert");
  panel.style.margin = "24px";
  panel.style.padding = "18px 20px";
  panel.style.border = "1px solid rgba(255, 120, 120, 0.45)";
  panel.style.borderRadius = "18px";
  panel.style.background = "rgba(40, 10, 18, 0.92)";
  panel.style.color = "#ffe7e7";
  panel.style.boxShadow = "0 18px 40px rgba(0, 0, 0, 0.28)";
  panel.innerHTML = `
    <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.8;">Project 01 Runtime Error</p>
    <strong style="display: block; margin-bottom: 8px; font-size: 18px;">畫面內容沒有成功載入</strong>
    <p style="margin: 0; line-height: 1.6;">${error?.message || "Unknown error"}</p>
  `;

  const shell = document.querySelector(".game-shell");
  if (shell) {
    shell.prepend(panel);
  } else {
    document.body.prepend(panel);
  }
}

try {
  renderShared();
} catch (error) {
  showRenderError(error);
}
