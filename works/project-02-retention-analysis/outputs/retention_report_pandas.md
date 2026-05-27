# pandas 分析摘要

## KPI Overview

- 玩家數：12
- D1 留存：100.0%
- D3 留存：58.3%
- D7 留存：33.3%
- 第 8 關後流失玩家：4

## Cohort Summary

| install_date | installs | retained_d1_pct | retained_d3_pct | retained_d7_pct |
| --- | --- | --- | --- | --- |
| 2026-05-01 | 4 | 100.0 | 75.0 | 25.0 |
| 2026-05-02 | 4 | 100.0 | 50.0 | 50.0 |
| 2026-05-03 | 4 | 100.0 | 50.0 | 25.0 |

## Segment Summary

| payer_segment | players | retained_d3_pct | retained_d7_pct |
| --- | --- | --- | --- |
| mid_payer | 1 | 100.0 | 100.0 |
| light_payer | 2 | 100.0 | 50.0 |
| non_payer | 9 | 44.4 | 22.2 |

## Top Churn Events

| event_type | count |
| --- | --- |
| level_fail | 3 |
| event_ignore | 2 |
| tutorial_end | 2 |

## 分析結論

1. 留存主要斷點落在 D3 之後，代表問題更偏向第二天後的體驗延續。
2. non_payer 仍是最大量體且 D7 表現偏弱，適合做低活躍新手召回切分。
3. level_fail 是最主要的流失前事件，關卡難度與補強提示應優先驗證。