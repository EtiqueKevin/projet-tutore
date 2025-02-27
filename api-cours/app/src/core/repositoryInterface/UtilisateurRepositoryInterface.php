<?php

namespace apiCours\core\repositoryInterface;

interface UtilisateurRepositoryInterface
{
    public function getModulesStatus(string $token): array;

    public function getLessonsStatus(string $token): array;

    public function getLessonStatus(string $token, string $idLesson): int;
}