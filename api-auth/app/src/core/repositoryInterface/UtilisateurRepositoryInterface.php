<?php

namespace apiAuth\core\repositoryInterface;

use apiAuth\core\domain\entities\user\User;

interface UtilisateurRepositoryInterface
{
    public function createUtilisateur(User $user): void;

}