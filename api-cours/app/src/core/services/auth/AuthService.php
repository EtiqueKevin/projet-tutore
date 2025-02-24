<?php

namespace apiCours\core\services\auth;

use apiCours\core\repositoryInterface\AuthRepositoryInterface;

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
}