<?php

use apiUtilisateur\application\actions\user\CreateUtilisateurAction;
use apiUtilisateur\application\actions\user\GetUserById;
use apiUtilisateur\core\repositoryInterface\UsersRepositoryInterface;
use apiUtilisateur\core\services\user\UsersService;
use apiUtilisateur\core\services\user\UsersServiceInterface;
use apiUtilisateur\infrastructure\repository\PDOUsersRepository;
use Psr\Container\ContainerInterface;

return [


    UsersRepositoryInterface::class => function (ContainerInterface $c) {
        return new PDOUsersRepository($c->get('jeancademydb.pdo'));
    },

    UsersServiceInterface::class => function (ContainerInterface $c){
        return new UsersService($c->get(UsersRepositoryInterface::class));
    },

    GetUserById::class => function (ContainerInterface $c){
    return new GetUserById($c->get(UsersServiceInterface::class));
    },

    CreateUtilisateurAction::class => function (ContainerInterface $c) {
    return new CreateUtilisateurAction($c->get(UsersServiceInterface::class));
    }

];