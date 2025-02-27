<?php

namespace apiUtilisateur\core\services\user;

use apiUtilisateur\core\dto\user\InputUserDTO;
use apiUtilisateur\core\dto\user\UserDTO;

interface UsersServiceInterface{

    public function getUsersId(string $id): UserDTO;
    function save(InputUserDTO $inpputUserDTO): void;

    function update(InputUserDTO $inputUserDTO): void;
    function deleteUser(string $id): void;
    function changeToJohnDoe(string $id): void;
    function getUsers(): array;
    public function getModuleStatusByUser(string $id): array;

    public function getLessonStatusByUser(string $id): array;
    public function getLessonStatusById(string $id): int;
    public function getModuleStatusById(string $id): int;
    function finishLesson(string $idUser, string $idLesson, $token): void;
    function startLesson(string $idUser, string $idLesson, $token): void;
    function rateModule(string $idUser, string $idModule, int $rate): void;
    function getRateOfModule(string $idModule): int;
}