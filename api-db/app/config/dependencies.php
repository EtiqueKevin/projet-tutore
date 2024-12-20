<?php

use apiDB\application\actions\user\GetUserById;
use apiDB\core\repositoryInterface\RepositoryInterfaceUsers;
use apiDB\core\services\user\UsersService;
use apiDB\core\services\user\UsersServiceInterface;
use apiDB\infrastructure\repository\PDOreposiroryUsers;
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