<?php

namespace apiCours\core\services\auth;

use apiCours\core\repositoryInterface\AuthRepositoryInterface;
use apiCours\core\repositoryInterface\ModuleRepositoryInterface;

class AuthService implements AuthServiceInterface
{
    private AuthRepositoryInterface $repositoryAuth;
    private ModuleRepositoryInterface $repositoryModule;

    public function __construct(AuthRepositoryInterface $repositoryAuth, ModuleRepositoryInterface $repositoryModule){
        $this->repositoryAuth = $repositoryAuth;
        $this->repositoryModule = $repositoryModule;
    }

    public function getUtilisateurId(string $token): string
    {
        $id = $this->repositoryAuth->getUtilisateurId($token);
        return $id;
    }

    public function adminVerification(string $id): bool
    {
        $role = $this->repositoryAuth->getRoleById($id);
        return $role == 100;
    }

    public function hisModule(string $id_module, string $id_user): bool
    {
        $module = $this->repositoryModule->getModuleById($id_module);
        return $module->idCreator == $id_user;
    }


    public function isProf(string $id): bool
    {
        $role = $this->repositoryAuth->getRoleById($id);
        return $role == 10;
    }

    public function hisLesson(string $id_lesson, string $id_user): bool
    {
        $moduleOfLesson = $this->repositoryModule->getModuleByLessonId($id_lesson);
        return $moduleOfLesson->idCreator == $id_user;
    }
}