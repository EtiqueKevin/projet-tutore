<?php

namespace apiUtilisateur\core\repositoryInterface;

interface AuthRepositoryInterface
{
    public function getUtilisateurId(string $token): string;
    public function suppUtilisateurById(string $id): void;
}