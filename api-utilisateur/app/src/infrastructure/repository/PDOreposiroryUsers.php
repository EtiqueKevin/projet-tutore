<?php

namespace apiUtilisateur\infrastructure\repository;

use apiUtilisateur\core\domain\entities\user\User;
use apiUtilisateur\core\repositoryInterface\RepositoryInterfaceUsers;
use DateTime;
use Exception;

class PDOreposiroryUsers implements RepositoryInterfaceUsers {

    private \PDO $pdo;

    public function __construct(\PDO $pdo) {
        $this->pdo = $pdo;
    }

    function getUserById(string $id): User{
        try{
            $stmt = $this->pdo->prepare('SELECT * FROM users WHERE uuid = :id');
            $stmt->execute(['id' => $id]);
            $user = $stmt->fetch();

            if (!$user){
                throw new \Exception('User not found');
            }

            if($user['linkpic'] == null){
                $user['linkpic'] = 'default_pic.jpg';
            }

            $u = new User($user['name'],$user['surname'],$user['role'],$user['linkpic'],$user['email'], DateTime::createFromFormat('Y-m-d',$user['datesignup']),DateTime::createFromFormat('Y-m-d',$user['datesignin']));
            $u->setID($user['uuid']);
            return $u;
        }catch (Exception $e) {
            throw new \Exception('Error fetching user from database: '. $e->getMessage());
        }

    }
}