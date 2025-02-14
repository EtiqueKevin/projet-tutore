<?php

namespace apiUtilisateur\core\services\auth;

interface AuthServiceInterface
{

    public function getUtilisateurId(string $token): string;
}