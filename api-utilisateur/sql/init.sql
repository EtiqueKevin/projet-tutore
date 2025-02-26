CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "users";
CREATE TABLE "public"."users" (
    "id" uuid NOT NULL,
    "name" character varying(50) NOT NULL,
    "surname" character varying(50) NOT NULL,
    "pseudo" character varying(50) NOT NULL,
    "linkpic" character varying(255),
    CONSTRAINT "users_id" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "users" ("id", "name", "surname", "pseudo", "linkpic") VALUES
    ('9bc9ec6a-e9c3-483c-b799-ad208c32e6d2', 'Clement', 'Brito', 'Clem1', 'johndoe.jpg'),
    ('e4fb9d21-7dd6-4ce5-b32a-ecdcf936e3da', 'Paul', 'Bruson', 'Polo', 'johndoe.jpg'),
    ('6d697d55-0d71-440d-ae82-2a1a59b5f23a', 'Kevin', 'Etique', 'Kev', 'johndoe.jpg'),
    ('14c73c46-a918-4268-8b12-db809ed49c0c', 'Clement', 'Netange', 'Clem2', 'johndoe.jpg'),
    ('85e2662f-fe2a-4bb7-933d-81a6ab467057', 'Amaury', 'Quilliec', 'Amau', 'johndoe.jpg'),
    ('a10a1303-33dd-4307-9273-5016f198709d', 'Amine', 'Boumaza', 'Amine', 'johndoe.jpg');

DROP TABLE IF EXISTS "comments";
CREATE TABLE "public"."comments" (
    "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "id_user" uuid NOT NULL,
    "id_rep_com" uuid,
    "id_rep_module" uuid,
    "id_rep_lesson" uuid,
    "date_post" date DEFAULT CURRENT_DATE,
    "content" text NOT NULL,
    CONSTRAINT "comments_id" PRIMARY KEY ("id")
) WITH (oids = false);

DROP TABLE IF EXISTS "reporting";
CREATE TABLE "public"."reporting" (
    "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "id_users" uuid NOT NULL,
    "id_reported" uuid NOT NULL,
    "code" character varying(10),
    "description" text,
    "status" character varying(50),
    "date_report" date DEFAULT CURRENT_DATE,
    CONSTRAINT "reporting_id" PRIMARY KEY ("id")
) WITH (oids = false);

DROP TABLE IF EXISTS "user_modules";
CREATE TABLE "public"."user_modules" (
    "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "id_module" uuid NOT NULL,
    "id_users" uuid NOT NULL,
    "status" boolean DEFAULT false NOT NULL,
    "index" smallint DEFAULT 0 NOT NULL,
    "rate" smallint,
    "date_update" date DEFAULT CURRENT_DATE,
    CONSTRAINT "user_modules_id" PRIMARY KEY ("id")
) WITH (oids = false);

DROP TABLE IF EXISTS "user_lessons";
CREATE TABLE "public"."user_lessons" (
    "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "id_lesson" uuid NOT NULL,
    "id_users" uuid NOT NULL,
    "status" boolean DEFAULT false NOT NULL,
    "date_update" date DEFAULT CURRENT_DATE,
    CONSTRAINT "user_lessons_id" PRIMARY KEY ("id"),
    CONSTRAINT "unique_user_lessons" UNIQUE ("id_lesson", "id_users")
) WITH (oids = false);