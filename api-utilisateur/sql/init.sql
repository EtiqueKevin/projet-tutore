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

DROP TABLE IF EXISTS "comments";
CREATE TABLE "public"."comments" (
    "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "id_user" uuid NOT NULL,
    "id_rep_com" uuid,
    "id_rep_module" uuid,
    "id_rep_lesson" uuid,
    "date_post" date DEFAULT CURRENT_DATE,
    "content" text NOT NULL,
    CONSTRAINT "comments_id" PRIMARY KEY ("id"),
    CONSTRAINT "comments_rep_fk" FOREIGN KEY ("id_rep") REFERENCES "comments"("id") ON DELETE CASCADE
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