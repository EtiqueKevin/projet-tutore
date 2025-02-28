<?php

namespace apiUtilisateur\infrastructure\repository;

use apiUtilisateur\core\domain\entities\demande\Demande;
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
            $stmt = $this->pdo->prepare('SELECT * FROM users WHERE id = ?');
            $stmt->bindParam(1, $id);
            $stmt->execute();
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

    function finishLesson(string $idUser, string $idLesson): void
    {
        try {
            $date = new DateTime();
            $date = $date->format('Y-m-d H:i:s');
            $status = 1;
            $stmt = $this->pdo->prepare('UPDATE user_lessons SET status = ?, date_update = ? WHERE id_lesson = ? AND id_users = ?');
            $stmt->bindParam(1, $status);
            $stmt->bindParam(2, $date);
            $stmt->bindParam(3, $idLesson);
            $stmt->bindParam(4, $idUser);
            $stmt->execute();
        }catch (Exception $e) {
            throw new \Exception('Error fetching user from database: '. $e->getMessage());
        }
    }

    function startLesson(string $idUser, string $idLesson): void
    {
        try {
            $date = new DateTime();
            $stmt = $this->pdo->prepare('INSERT INTO user_lessons (id_lesson, id_users ) VALUES (?, ?)');
            $stmt->bindParam(1, $idLesson);
            $stmt->bindParam(2, $idUser);
            $stmt->execute();
        }catch (Exception $e) {
            $errorCode = $e->getCode();
            switch ($errorCode){
                case '23505':
                    throw new \Exception('Lesson deja commencée');
                case '42P01':
                    throw new \Exception('erreur de syntaxe');
                default:
                    throw new \Exception('Error fetching user from database: '. $e->getMessage());
            }
        }
    }

    public function getModuleStatusByUser(string $id): array{
        try{
            $stmt = $this->pdo->prepare('SELECT * FROM user_modules WHERE id_users = ?');
            $stmt->BindParam(1,$id);
            $stmt->execute();
            $modules = $stmt->fetchAll();

            $modulesListIdStatus = [];
            foreach ($modules as $module){
                $modulesListIdStatus[$module['id_module']] = $module['status'];
            }

            return $modulesListIdStatus;

        }catch (Exception $e) {
            throw new \Exception('Error fetching module from database: '. $e->getMessage());
        }
    }

    public function getLessonStatusByUser(string $id): array{
        try{
            $stmt = $this->pdo->prepare('SELECT * FROM user_lessons WHERE id_users = ?');
            $stmt->BindParam(1,$id);
            $stmt->execute();
            $lessons = $stmt->fetchAll();

            $lessonsListIdStatus = [];
            foreach ($lessons as $lesson){
                $lessonsListIdStatus[$lesson['id_lesson']] = $lesson['status'];
            }

            return $lessonsListIdStatus;

        }catch (Exception $e) {
            throw new \Exception('Error fetching module from database: '. $e->getMessage());
        }
    }

    public function getLessonStatusById(string $id, $idUser): int
    {
        try {
            $retour = 2;
            $stmt = $this->pdo->prepare('SELECT * FROM user_lessons WHERE id_lesson = ? AND id_users = ?');
            $stmt->bindParam(1, $id);
            $stmt->bindParam(2, $idUser);
            $stmt->execute();
            $lesson = $stmt->fetch();

            if($lesson){
                if ($lesson['status'] == 1){
                    $retour = 1;
                }else{
                    $retour = 0;
                }
            }
            return $retour;
        }catch (Exception $e) {
            throw new \Exception('Error fetching user from database: '. $e->getMessage());
        }
    }

    public function getModuleStatusById(string $id, $idUser): int
    {
        try {
            $retour = 2;
            $stmt = $this->pdo->prepare('SELECT * FROM user_modules WHERE id_module = ? AND id_users = ?');
            $stmt->bindParam(1, $id);
            $stmt->bindParam(2, $idUser);
            $stmt->execute();
            $module = $stmt->fetch();

            if($module){
                if ($module['status'] == true){
                    $retour = 1;
                }else{
                    $retour = 0;
                }
            }
            return $retour;
        }catch (Exception $e) {
            throw new \Exception('Error fetching user from database: '. $e->getMessage());
        }
    }

    public function updateStatusModule(string $idUser, string $idModule, int $status): void
    {
        try {
            $date = new DateTime();
            $date = $date->format('Y-m-d H:i:s');

            if ($status == 0) {
                $stmt = $this->pdo->prepare('INSERT INTO user_modules (id_module, id_users, status) VALUES (?, ?, ?)');
                $stmt->bindParam(1, $idModule);
                $stmt->bindParam(2, $idUser);
                $stmt->bindParam(3, $status);
                $stmt->execute();
            } else {
                $stmt = $this->pdo->prepare('UPDATE user_modules SET status = ?, date_update = ? WHERE id_module = ? AND id_users = ?');
                $stmt->bindParam(1, $status);
                $stmt->bindParam(2, $date);
                $stmt->bindParam(3, $idModule);
                $stmt->bindParam(4, $idUser);
                $stmt->execute();
            }
        }catch (Exception $e) {
            throw new \Exception('Error fetching user from database: '. $e->getMessage());
        }
    }

    public function rateModule(string $idUser, string $idModule, int $rate): void
    {
        try {
            $stmt = $this->pdo->prepare('UPDATE user_modules SET rate = ? WHERE id_module = ? AND id_users = ?');
            $stmt->bindParam(1, $rate);
            $stmt->bindParam(2, $idModule);
            $stmt->bindParam(3, $idUser);
            $stmt->execute();
        }catch (Exception $e) {
            throw new \Exception('Error fetching user from database: '. $e->getMessage());
        }
    }

    public function getRateModule(string $idModule): float
    {
        try {
            $stmt = $this->pdo->prepare('SELECT AVG(rate) FROM user_modules WHERE id_module = ? AND rate > 0');
            $stmt->bindParam(1, $idModule);
            $stmt->execute();
            $rate = $stmt->fetchColumn();
            if ($rate == null){
                $rate = 0;
            }
            return $rate;
        }catch (Exception $e) {
            throw new \Exception('Error fetching user from database: '. $e->getMessage());
        }
    }

    public function getDemandes(): array
    {
        try {
            $stmt = $this->pdo->prepare('SELECT * FROM demmands inner join users on demmands.id_utilisateur = users.id');
            $stmt->execute();
            $demandes = $stmt->fetchAll();

            $demandeTab = [];
            foreach ($demandes as $demande){
                $userEntity = new User($demande['name'],$demande['surname'],$demande['linkpic'],$demande['pseudo']);
                $userEntity->setID($demande['id_utilisateur']);
                $demandeEntity = new Demande($userEntity);
                $demandeEntity->setID($demande['id']);
                $demandeTab[] = $demandeEntity;
            }
            return $demandeTab;
        }catch (Exception $e) {
            throw new \Exception('Error fetching user from database: '. $e->getMessage());
        }
    }

    public function ajouterDemande(string $idUser): void
    {
        try {
            $stmt = $this->pdo->prepare('SELECT COUNT(*) FROM demmands WHERE id_utilisateur = ?');
            $stmt->bindParam(1, $idUser);
            $stmt->execute();
            if ($stmt->fetchColumn() > 0) {
                throw new \Exception('La demande existe déjà');
            }

            $stmt = $this->pdo->prepare('INSERT INTO demmands (id_utilisateur) VALUES (?)');
            $stmt->bindParam(1, $idUser);
            $stmt->execute();
        }catch (Exception $e) {
            throw new \Exception('Error fetching user from database: '. $e->getMessage());
        }
    }
}