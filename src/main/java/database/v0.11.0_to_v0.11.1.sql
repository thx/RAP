USE rap_db;

-- 缓存优化，智能判断接口是否应用缓存
ALTER TABLE tb_action
ADD COLUMN disable_cache TINYINT NOT NULL
  DEFAULT 0;

-- 默认先全部disable_cache
UPDATE tb_action
SET disable_cache = 1
WHERE id != 0