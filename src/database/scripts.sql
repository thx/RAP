-- recent projects

SELECT p.name projectName, u.name userName, p.create_date projectCreateTime, p.introduction
FROM tb_project p
JOIN tb_user u ON p.user_id = u.id
ORDER BY p.id DESC

-- recent users

SELECT *
FROM tb_user
ORDER BY id DESC

-- counters
SELECT COUNT(*) userNum FROM tb_user;
SELECT COUNT(*) projectNum FROM tb_project;


-- counting projects (actions >= 5)
SELECT p.id, p.name, COUNT(a.id)
FROM tb_project p
JOIN tb_module m ON m.project_id = p.id
JOIN tb_page p2 ON p2.module_id = m.id
JOIN tb_action_and_page ap ON ap.page_id = p2.id
JOIN tb_action a ON a.id = ap.action_id
GROUP BY p.id
HAVING COUNT(a.id) > 5
ORDER BY count(a.id) DESC
