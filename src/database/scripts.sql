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