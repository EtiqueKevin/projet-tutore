<?php

namespace apiUtilisateur\core\repositoryInterface;

use apiUtilisateur\core\domain\entities\user\User;

interface RepositoryInterfaceUsers{

    function getUserById(string $id) : User;

}