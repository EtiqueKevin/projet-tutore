<?php

namespace apiUtilisateur\core\services\user;

use apiUtilisateur\core\dto\user\InputUserDTO;
use apiUtilisateur\core\dto\user\UserDTO;

interface UsersServiceInterface{

    public function getUsersId(string $id): UserDTO;
    function save(InputUserDTO $inpputUserDTO): void;

    function update(InputUserDTO $inpputUserDTO): void;
    function deleteUser(string $id): void;
    function changeToJohnDoe(string $id): void;
    function getUsers(): array;
    public function getModuleStatusByUser(string $id): array;

    public function getLessonStatusByUser(string $id): array;
    function finishLesson(string $idUser, string $idLesson): void;

}