<?php

namespace apiUtilisateur\core\repositoryInterface;

use apiUtilisateur\core\domain\entities\user\User;

interface UsersRepositoryInterface{

    function getUserById(string $id) : User;
    function save(User $user):void;
    function update(User $user):void;
    function deleteUser(string $id):void;
    function getUsers():array;
    function finishLesson(string $idUser, string $idLesson):void;
    function startLesson(string $idUser, string $idLesson):void;
    public function getModuleStatusByUser(string $id): array;
    public function getLessonStatusByUser(string $id): array;
    public function getLessonStatusById(string $id, $idUser): int;
    public function getModuleStatusById(string $id, $idUser): int;
    public function updateStatusModule(string $idUser, string $idModule, int $status): void;
    public function rateModule(string $idUser, string $idModule, int $rate): void;
    public function getRateModule(string $idModule): float;
    public function getDemandes() : array;
    public function ajouterDemande(string $idUser): void;
    public function supprimerDemande(string $idDemande): string;
    public function getAllLinkPic(): array;

}