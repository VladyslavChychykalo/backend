CREATE TABLE "user"
(
    id SERIAL,
    name VARCHAR(100) NOT  NULL,
    CONSTRAINT "user_id_pk" PRIMARY KEY ("id")
);

CREATE TABLE "task"
(
    id SERIAL,
    user_id INT NOT NULL,
    task_description VARCHAR (255) NOT NULL,
    CONSTRAINT "task_id_pk" PRIMARY KEY ("id"),
    CONSTRAINT "task_user_relation" FOREIGN KEY (user_id) REFERENCES "user" (id)
);

ALTER TABLE task DROP CONSTRAINT task_user_relation;
ALTER TABLE task ADD CONSTRAINT  "task_user_relation" FOREIGN KEY (user_id) REFERENCES  "user" (id) ON DELETE CASCADE;
-- ====
-- ALTER TABLE "user"
--     ADD created_at TIMESTAMP DEFAULT now()
-- ,
-- ADD updated_at TIMESTAMP DEFAULT now
-- ();

-- ALTER TABLE "task"
--     ADD created_at TIMESTAMP DEFAULT now()
-- ,
-- ADD updated_at TIMESTAMP DEFAULT now
-- ();
-- ====
INSERT INTO "user"
    (name)
VALUES
    ('czz');
INSERT INTO "user"
    (name)
VALUES
    ('Pupkin');

-- cascad delete

UPDATE "user"
SET name = '2112'
WHERE name = 'czz';

SELECT *
FROM "user";

SELECT user_id, task_description, created_at, updated_at
FROM "user" LEFT JOIN "task"
    ON "user".id = "task".user_id;

DROP TABLE "user";
DROP TABLE "task";

SELECT task.id
FROM "user"
    LEFT JOIN task on "user".id = task.user_id
WHERE "user".id = 1