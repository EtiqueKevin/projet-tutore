<?php

namespace apiUtilisateur\core\repositoryInterface;

use apiUtilisateur\core\domain\entities\user\User;

interface UsersRepositoryInterface{

    function getUserById(string $id) : User;

    function save(User $user):void;

    function update(User $user):void;

}