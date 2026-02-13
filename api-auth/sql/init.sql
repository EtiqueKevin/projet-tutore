CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "users";
CREATE TABLE "public"."users" (
    "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "role" smallint DEFAULT 0 NOT NULL,
    "email" character varying(100) NOT NULL,
    "password" character varying(255) NOT NULL,
    "date_signup" date DEFAULT CURRENT_DATE,
    "date_signin" date DEFAULT CURRENT_DATE,
    CONSTRAINT "users_email" UNIQUE ("email"),
    CONSTRAINT "users_id" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "users" ("id", "role", "email", "password") VALUES
    ('1c8e5b9a-7c3d-4f0e-9a1b-2c3d4e5f6a7b', 100, 'admin@jeancademie.com', '$2y$10$d/b.Q8hHkPDdfLC1PQAG/uj9XGyWcEb3DOjYheSNrlNhHDY/uX5m2'), 
    -- Password: Admin!1234
    ('9bc9ec6a-e9c3-483c-b799-ad208c32e6d2', 100, 'brito.clement@gmail.com', '$2y$10$7738FrDFLxe8zMhFfuDHouolnlrzRO9vgpqV7twRcqahkLf0sulhK'),
    ('e4fb9d21-7dd6-4ce5-b32a-ecdcf936e3da', 100, 'bruson.paul@gmail.com', '$2y$10$93sC5jLrn138HgevRG.9euUAYcD.rX86ZYtyF4NSwHEd71Nu4i3Fu'),
    ('6d697d55-0d71-440d-ae82-2a1a59b5f23a', 100, 'etique.kevin@gmail.com', '$2y$10$Ul3mwzltbbJnVUIPVmFZP.TfrgFHc/Kg226Si9fkLOjwgUtbJUvgm'),
    ('14c73c46-a918-4268-8b12-db809ed49c0c', 100, 'netange.clement@gmail.com', '$2y$10$JaeVX3OUiNESFF1w3MInsuVPiVs1/EoVs1rSGZ9sTJJqJD6zAZiHq'),
    ('85e2662f-fe2a-4bb7-933d-81a6ab467057', 100, 'quilliec.amaury@gmail.com', '$2y$10$T2g2myflB72jJeOwJlSbzOQdovURvkAmVcIqz5kx1HohlUmOUmiDi'),
    ('a10a1303-33dd-4307-9273-5016f198709d', 100, 'boumaza.amine@gmail.com', '$2y$10$zQRhT.T5J00K8idGd2p8suzVzMWDjk6ovx8PBlFQFmc8ZYqK142RG');