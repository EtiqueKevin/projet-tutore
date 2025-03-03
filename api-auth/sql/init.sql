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
    ('9bc9ec6a-e9c3-483c-b799-ad208c32e6d2', 100, 'brito.clement@gmail.com', '$2y$10$.kJfrhkr2dUCltexeduDfuWFFL/9KLkzA7.LRpnlaAcUkAiKeSpMy'),
    ('e4fb9d21-7dd6-4ce5-b32a-ecdcf936e3da', 100, 'bruson.paul@gmail.com', '$2y$10$xci/KKZ/mlqrDuWfsvp38ehW4fSm5YY2i2pvtrjXIS7eSiSpo0MVW'),
    ('6d697d55-0d71-440d-ae82-2a1a59b5f23a', 100, 'etique.kevin@gmail.com', '$2y$10$VTBUMs/oE/V7DdHtF7GUueQpxZ1FE7RfCfabaIWTzBaR7m2l4Rr0u'),
    ('14c73c46-a918-4268-8b12-db809ed49c0c', 100, 'netange.clement@gmail.com', '$2y$10$HJi/xw85ZfBe9fgWAqUFteZbOuu9okObAPQsHQrYRF5ahvs2BJPre'),
    ('85e2662f-fe2a-4bb7-933d-81a6ab467057', 100, 'quilliec.amaury@gmail.com', '$2y$10$B4TJaotShHSmP3b77OVPcu09LmuoLJFjQN9Z6jsVj1KeyxIqdY.PS'),
    ('a10a1303-33dd-4307-9273-5016f198709d', 10, 'boumaza.amine@gmail.com', '$2y$10$75T2rJWpdxZSY0fhqeB3Bub/jAojWzDjv7uoDHOjyVOdYKpnSsDHy');