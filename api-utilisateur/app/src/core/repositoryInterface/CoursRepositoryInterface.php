<?php

namespace apiUtilisateur\core\repositoryInterface;

interface CoursRepositoryInterface
{
    public function changeToJohnDoe(string $id): void;
}