<?php

namespace apiUtilisateur\core\repositoryInterface;

interface AuthRepositoryInterface
{
    public function getUtilisateurId(string $token): string;
    public function suppUtilisateurById(string $id): void;
    public function getRoleById(string $id): string;
    public function getEmailById(string $id): string;
    public function updateRole(string $id, string $role, string $token): void;
}