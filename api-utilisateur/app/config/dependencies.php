<?php

use apiUtilisateur\application\actions\user\GetUserById;
use apiUtilisateur\core\repositoryInterface\UsersRepositoryInterface;
use apiUtilisateur\core\services\user\UsersService;
use apiUtilisateur\core\services\user\UsersServiceInterface;
use apiUtilisateur\infrastructure\repository\PDOreposiroryUsersRepositoryInterface;
use Psr\Container\ContainerInterface;

return [


    UsersRepositoryInterface::class => function (ContainerInterface $c) {
        return new PDOreposiroryUsersRepositoryInterface($c->get('jeancademydb.pdo'));
    },

    UsersServiceInterface::class => function (ContainerInterface $c){
        return new UsersService($c->get(UsersRepositoryInterface::class));
    },

    GetUserById::class => function (ContainerInterface $c){
    return new GetUserById($c->get(UsersServiceInterface::class));
    },

];