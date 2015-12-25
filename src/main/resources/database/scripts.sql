-- recent projects

SELECT
  p.name        projectName,
  u.name        userName,
  p.create_date projectCreateTime,
  p.introduction
FROM tb_project p
  JOIN tb_user u ON p.user_id = u.id
ORDER BY p.id DESC

-- recent users

SELECT *
FROM tb_user
ORDER BY id DESC

-- counters
SELECT COUNT(*) userNum
FROM tb_user;
SELECT COUNT(*) projectNum
FROM tb_project;


-- counting projects (actions >= 5)
SELECT
  p.id,
  p.name,
  COUNT(a.id)
FROM tb_project p
  JOIN tb_module m ON m.project_id = p.id
  JOIN tb_page p2 ON p2.module_id = m.id
  JOIN tb_action_and_page ap ON ap.page_id = p2.id
  JOIN tb_action a ON a.id = ap.action_id
GROUP BY p.id
HAVING COUNT(a.id) > 5
ORDER BY count(a.id) DESC


-- search request_url
SELECT
  a.name       actionName,
  m.project_id projectId
FROM tb_action a
  JOIN tb_action_and_page ap ON ap.action_id = a.id
  JOIN tb_page p ON p.id = ap.page_id
  JOIN tb_module m ON m.id = p.module_id
WHERE request_url LIKE '%key%'

-- search organization info by projectId
SELECT CONCAT(c.name, '-', pl.name, '-', g.name, '-', p.name) AS info
FROM tb_project p
  JOIN tb_group g ON g.id = p.group_id
  JOIN tb_production_line pl ON pl.id = g.production_line_id
  JOIN tb_corporation c ON c.id = pl.corporation_id
WHERE p.id = {projectId}