-- Création de la table Users
CREATE TABLE Users (
    UUID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    Name VARCHAR(50) NOT NULL,
    Surname VARCHAR(50) NOT NULL,
    Role INTEGER NOT NULL,
    Linkpic VARCHAR(255),
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    DateSignup TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    DateSignin TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table Module
CREATE TABLE Module (
    UUID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    Id_creator UUID NOT NULL REFERENCES Users(UUID) ON DELETE CASCADE,
    Description TEXT,
    Nblesson INTEGER CHECK (Nblesson >= 0),
    DateUpdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table Lesson
CREATE TABLE Lesson (
    UUID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    Name VARCHAR(100) NOT NULL,
    Type VARCHAR(50),
    Href VARCHAR(255),
    DateUpdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table Module_lesson
CREATE TABLE Module_lesson (
    UUID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    Id_module UUID NOT NULL REFERENCES Module(UUID) ON DELETE CASCADE,
    Id_lesson UUID NOT NULL REFERENCES Lesson(UUID) ON DELETE CASCADE
);

-- Création de la table Module_users
CREATE TABLE Module_users (
    UUID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    Id_module UUID NOT NULL REFERENCES Module(UUID) ON DELETE CASCADE,
    Id_users UUID NOT NULL REFERENCES Users(UUID) ON DELETE CASCADE,
    Stage INTEGER CHECK (Stage >= 0),
    Status VARCHAR(50),
    Rate INTEGER CHECK (Rate >= 0 AND Rate <= 5),
    DateUpdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table Comments
CREATE TABLE Comments (
    UUID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    Id_user UUID NOT NULL REFERENCES Users(UUID) ON DELETE CASCADE,
    Id_rep UUID REFERENCES Comments(UUID) ON DELETE CASCADE,
    DatePost TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Content TEXT NOT NULL
);

-- Création de la table Reporting
CREATE TABLE Reporting (
    UUID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    Id_users UUID NOT NULL REFERENCES Users(UUID) ON DELETE CASCADE,
    Id_reported UUID NOT NULL,
    Code VARCHAR(10),
    Description TEXT,
    Status VARCHAR(50),
    DateReport TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO Users (UUID, Name, Surname, Role, Email, Password) VALUES 
('3577a401-61d8-4dd1-92df-c94180075a83', 'Kevin', 'Etique', '100', 'patate@gmail.com', '$2y$10$iSP91gYLEZh5uEV0JfQiyO8CosNQ8YNLjHF7wJBuJh3mmMz0LDWX2'),
('235aa205-3ac9-45ed-ae89-b5590a25b183', 'Clement', 'Netange', '10', 'salope@gmail.com', '$2y$10$iSP91gYLEZh5uEV0JfQiyO8CosNQ8YNLjHF7wJBuJh3mmMz0LDWX2'),
('ffa99558-ee19-4877-82e5-b72500464a97', 'Amaury', 'Quilliec', '50', 'ok@gmail.com', '$2y$10$iSP91gYLEZh5uEV0JfQiyO8CosNQ8YNLjHF7wJBuJh3mmMz0LDWX2');


INSERT INTO Module (UUID, Id_creator, Description, Nblesson) VALUES
('d904f66c-9ebe-4e79-b1ca-35a5802c55bb','3577a401-61d8-4dd1-92df-c94180075a83','En vrai faites pas attention',2),
('e8ecfee8-12d2-457f-9da2-686f0def3bda','ffa99558-ee19-4877-82e5-b72500464a97','franchement symap le cours',1),
('f186fb52-ae93-41ee-8c62-947f5ba35a53','ffa99558-ee19-4877-82e5-b72500464a97','AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAh',3);


INSERT INTO Lesson (UUID, Name, Type, Href) VALUES
('b6bfd662-6d81-4b3b-ba3d-177ea84095b0', 'Cours 1', 'XML', ''),
('2345bdea-90a5-4c19-a2b0-4e7d03e00896', 'Cours 2', 'HTML', ''),
('ddb48b18-6779-4d46-8a77-79e87d461260', 'Cours PATATE' , 'CSS', ''),
('43c5c816-ac83-48bc-bb5a-16ad5419627a','Cours 10', 'JS', ''),
('561034c6-43af-448e-a6d4-8b4f6691a7e7','Cours 11', 'JS', ''),
('72a2b871-5207-462f-bac2-8b7e9f025eba','Cours 12', 'JS', '');



INSERT INTO Module_lesson (UUID, Id_module, Id_lesson) VALUES
('2b2b26f5-7fdd-4594-abdd-95853af9a997', 'd904f66c-9ebe-4e79-b1ca-35a5802c55bb', 'b6bfd662-6d81-4b3b-ba3d-177ea84095b0'),
('0ac62d49-0bf8-4205-a40d-3998ac8c1722', 'd904f66c-9ebe-4e79-b1ca-35a5802c55bb', '2345bdea-90a5-4c19-a2b0-4e7d03e00896'),
('7f84cb8e-ddf3-454e-87a5-72e8ac3734ee', 'e8ecfee8-12d2-457f-9da2-686f0def3bda', 'ddb48b18-6779-4d46-8a77-79e87d461260'),
('0e33227e-3ed2-4602-8c0c-64d3091a740b', 'f186fb52-ae93-41ee-8c62-947f5ba35a53', '43c5c816-ac83-48bc-bb5a-16ad5419627a'),
('4af8774c-1966-4df0-b1f3-fecd7bead5d6', 'f186fb52-ae93-41ee-8c62-947f5ba35a53', '561034c6-43af-448e-a6d4-8b4f6691a7e7'),
('36e5ef6d-4ac3-470c-b76a-1b8dbe40d187', 'f186fb52-ae93-41ee-8c62-947f5ba35a53', '72a2b871-5207-462f-bac2-8b7e9f025eba');


INSERT INTO Module_users (UUID, Id_module, Id_users, Stage, Status, Rate) VALUES
('daa8990d-a66d-46fa-bfd0-24ba6ae6b96d','d904f66c-9ebe-4e79-b1ca-35a5802c55bb','235aa205-3ac9-45ed-ae89-b5590a25b183',2,'END',4),
('17d83d28-2ce2-4b27-bc4a-61bc7da598c5','e8ecfee8-12d2-457f-9da2-686f0def3bda','235aa205-3ac9-45ed-ae89-b5590a25b183',1,'START',NULL),
('a28fcfdc-afd3-440b-bc41-68d91a9222e2','f186fb52-ae93-41ee-8c62-947f5ba35a53','235aa205-3ac9-45ed-ae89-b5590a25b183',2,'START',NULL);


-- CODE REPORT SIGNIFICATION
-- Commence par 1 : Signalement d'un utilisateur
    -- Suivi de 1 : Signalement pour usurpation d'identité
    -- Suivi de 2 : Signalement pour contenu inapproprié (photo, nom, prénom, etc.)
    -- Suivi de 3 : Signalement pour comportement inapproprié

-- Commence par 2 : Signalement d'un commentaire
    -- Suivi de 1 : Signalement pour contenu inapproprié
    -- Suivi de 2 : Signalement pour spam

-- Commence par 3 : Signalement d'un module
    -- Suivi de 1 : Signalement pour contenu inapproprié
    -- Suivi de 2 : Signalement pour contenu ne correspondant pas à la description
    -- Suivi de 3 : Signalement pour erreur dans le module

-- Commence par 4 : Signalement d'une leçon
    -- Suivi de 1 : Signalement pour contenu inapproprié
    -- Suivi de 2 : Signalement pour contenu ne correspondant pas à la description
    -- Suivi de 3 : Signalement pour erreur dans la leçon, exercice ou autre

-- SUIVI PAR 0 : Signalement pour AUTRE
