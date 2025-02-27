<?php

namespace apiUtilisateur\core\repositoryInterface;

interface CoursRepositoryInterface
{
    public function changeToJohnDoe(string $id): void;
    public function getModuleByLesson(string $idLesson, string $token): string;
    public function getLessonsIdsByModule(string $idModule, string $token): array;

}