<?php

namespace apiAuth\core\repositoryInterface;

use apiAuth\core\domain\entities\user\User;

interface AuthRepositoryInterface
{

    function findByEmail(string $email):User | null;

    function findById(string $id):User;

    function save(User $auth): string;
}