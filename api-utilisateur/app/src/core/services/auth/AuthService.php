<?php

namespace apiUtilisateur\core\services\auth;


use apiUtilisateur\core\repositoryInterface\AuthRepositoryInterface;

class AuthService implements AuthServiceInterface
{
    private AuthRepositoryInterface $repositoryAuth;

    public function __construct(AuthRepositoryInterface $repositoryAuth){
        $this->repositoryAuth = $repositoryAuth;
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

    public function himselfVerification(string $idUser, string $id): bool
    {
        return $idUser == $id;
    }
}