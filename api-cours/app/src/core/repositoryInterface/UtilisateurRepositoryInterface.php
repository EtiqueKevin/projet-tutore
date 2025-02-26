<?php

namespace apiCours\core\repositoryInterface;

interface UtilisateurRepositoryInterface
{
    public function getModulesStatus(string $token): array;

    public function getLessonsStatus(string $token): array;
}