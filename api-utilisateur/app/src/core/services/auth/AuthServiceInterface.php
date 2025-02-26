<?php

namespace apiUtilisateur\core\services\auth;

interface AuthServiceInterface
{

    public function getUtilisateurId(string $token): string;
    public function adminVerification(string $id): bool;
    public function himselfVerification(string $idUser, string $id): bool;
}