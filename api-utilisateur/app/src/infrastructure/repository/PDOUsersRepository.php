<?php

namespace apiUtilisateur\infrastructure\repository;

use apiUtilisateur\core\domain\entities\user\User;
use apiUtilisateur\core\repositoryInterface\UsersRepositoryInterface;
use DateTime;
use Exception;
use Faker\Factory;

class PDOUsersRepository implements UsersRepositoryInterface {

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

            $u = new User($user['name'],$user['surname'],$user['linkpic'],$user['pseudo']);
            $u->setID($user['id']);
            return $u;
        }catch (Exception $e) {
            throw new \Exception('Error fetching user from database: '. $e->getMessage());
        }
    }

    function save(User $user): void
    {

        $pseudo = $user->pseudo;
        if($pseudo == null || $pseudo == ''){
            $faker = Factory::create('fr_FR');
            $pseudo = $faker->userName;
        }

        $id = $user->getId();
        $name = $user->name;
        $surname = $user->surname;
        $linkpic = $user->linkpic;
        try {
            $stmt = $this->pdo->prepare('INSERT INTO users (id ,name, surname, linkpic, pseudo) VALUES (?, ?, ?, ?, ?) RETURNING id');
            $stmt->bindParam(1, $id);
            $stmt->bindParam(2, $name);
            $stmt->bindParam(3, $surname);
            $stmt->bindParam(4, $linkpic);
            $stmt->bindParam(5, $pseudo);
            $stmt->execute();
            $id = $stmt->fetchColumn();
        }catch (Exception $e) {
            throw new \Exception('Error fetching user from database: '. $e->getMessage());
        }

    }

    function update(User $user): void
    {
        $id = $user->getId();
        $name = $user->name;
        $surname = $user->surname;
        $linkpic = $user->linkpic;
        $pseudo = $user->pseudo;
        try {
            $stmt = $this->pdo->prepare('UPDATE users SET name = ?, surname = ?, linkpic = ?, pseudo = ? WHERE id = ?');
            $stmt->bindParam(1, $name);
            $stmt->bindParam(2, $surname);
            $stmt->bindParam(3, $linkpic);
            $stmt->bindParam(4, $pseudo);
            $stmt->bindParam(5, $id);
            $stmt->execute();
        }catch (Exception $e) {
            throw new \Exception('Error fetching user from database: '. $e->getMessage());
        }
    }

    function deleteUser(string $id): void
    {
        try {
            $stmt = $this->pdo->prepare('DELETE FROM users WHERE id = ?');
            $stmt->bindParam(1, $id);
            $stmt->execute();
        }catch (Exception $e) {
            throw new \Exception('Impossible de supprimer');
        }
    }

    function getUsers(): array
    {
        try {
            $stmt = $this->pdo->prepare('SELECT * FROM users');
            $stmt->execute();
            $users = $stmt->fetchAll();
            $usersList = [];
            foreach ($users as $user){
                $u = new User($user['name'],$user['surname'],$user['linkpic'],$user['pseudo']);
                $u->setID($user['id']);
                $usersList[] = $u;
            }
            return $usersList;
        }catch (Exception $e) {
            throw new \Exception('Error fetching user from database: '. $e->getMessage());
        }
    }

    function fininshLesson(string $idUser, string $idLesson): void
    {
        try {
            $stmt = $this->pdo->prepare('INSERT INTO user_lessons (id_lesson, id_user) VALUES (?, ?)');
            $stmt->bindParam(1, $idLesson);
            $stmt->bindParam(2, $idUser);
            $stmt->execute();
        }catch (Exception $e) {
            throw new \Exception('Error fetching user from database: '. $e->getMessage());
        }
    }
}