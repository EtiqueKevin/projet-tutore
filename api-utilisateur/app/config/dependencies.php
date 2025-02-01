<?php

use apiUtilisateur\application\actions\user\GetUserById;
use apiUtilisateur\core\repositoryInterface\RepositoryInterfaceUsers;
use apiUtilisateur\core\services\user\UsersService;
use apiUtilisateur\core\services\user\UsersServiceInterface;
use apiUtilisateur\infrastructure\repository\PDOreposiroryUsers;
use Psr\Container\ContainerInterface;

return [


    RepositoryInterfaceUsers::class => function (ContainerInterface $c) {
        return new PDOReposiroryUsers($c->get('jeancademydb.pdo'));
    },

    UsersServiceInterface::class => function (ContainerInterface $c){
        return new UsersService($c->get(RepositoryInterfaceUsers::class));
    },

    GetUserById::class => function (ContainerInterface $c){
    return new GetUserById($c->get(UsersServiceInterface::class));
    },

];