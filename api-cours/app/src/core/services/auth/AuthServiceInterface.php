<?php

namespace apiCours\core\services\auth;

interface AuthServiceInterface
{
    public function getUtilisateurId(string $token): string;
    public function adminVerification(string $id): bool;
    public function hisModule(string $id_module, string $id_user): bool;
    public function isProf(string $id): bool;
    public function hisLesson(string $id_lesson, string $id_user): bool;

}