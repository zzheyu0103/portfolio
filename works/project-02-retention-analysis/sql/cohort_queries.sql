-- Cohort retention summary
SELECT
  install_date,
  COUNT(DISTINCT player_id) AS installs,
  SUM(CASE WHEN retained_d1 = 'yes' THEN 1 ELSE 0 END) AS retained_d1_users,
  SUM(CASE WHEN retained_d3 = 'yes' THEN 1 ELSE 0 END) AS retained_d3_users,
  SUM(CASE WHEN retained_d7 = 'yes' THEN 1 ELSE 0 END) AS retained_d7_users
FROM player_events
GROUP BY install_date
ORDER BY install_date;

-- Players who reached level 8 and churned before D7
SELECT
  player_id,
  install_date,
  last_level,
  event_type,
  payer_segment
FROM player_events
WHERE reached_level_8 = 'yes'
  AND retained_d7 = 'no';

-- Compare event participation and D7 retention
SELECT
  event_type,
  COUNT(*) AS users,
  SUM(CASE WHEN retained_d7 = 'yes' THEN 1 ELSE 0 END) AS d7_retained_users
FROM player_events
GROUP BY event_type
ORDER BY users DESC;
