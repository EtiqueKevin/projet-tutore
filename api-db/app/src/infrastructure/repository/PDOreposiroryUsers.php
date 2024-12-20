<?php

namespace apiDB\infrastructure\repository;

use apiDB\core\domain\entities\user\User;
use apiDB\core\repositoryInterface\RepositoryInterfaceUsers;

class PDOreposiroryUsers implements RepositoryInterfaceUsers {

    private \PDO $pdo;

    public function __construct(\PDO $pdo) {
        $this->pdo = $pdo;
    }

    function getUsersById(string $id): User
    {

    }
}