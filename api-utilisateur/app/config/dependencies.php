<?php

use apiAuth\application\actions\DeleteUserByIdAction;
use apiUtilisateur\application\actions\user\CreateUtilisateurAction;
use apiUtilisateur\application\actions\user\GetUserById;
use apiUtilisateur\application\middleware\AuthMiddleware;
use apiUtilisateur\application\middleware\AuthzMiddleware;
use apiUtilisateur\core\repositoryInterface\AuthRepositoryInterface;
use apiUtilisateur\core\repositoryInterface\CoursRepositoryInterface;
use apiUtilisateur\core\repositoryInterface\UsersRepositoryInterface;
use apiUtilisateur\core\services\auth\AuthService;
use apiUtilisateur\core\services\auth\AuthServiceInterface;
use apiUtilisateur\core\services\user\UsersService;
use apiUtilisateur\core\services\user\UsersServiceInterface;
use apiUtilisateur\infrastructure\adaptater\AdaptaterAuthRepository;
use apiUtilisateur\infrastructure\adaptater\AdaptaterCoursRepository;
use apiUtilisateur\infrastructure\repository\PDOUsersRepository;
use Psr\Container\ContainerInterface;

return [


    UsersRepositoryInterface::class => function (ContainerInterface $c) {
        return new PDOUsersRepository($c->get('jeancademydb.pdo'));
    },

    AuthRepositoryInterface::class => function (ContainerInterface $c) {
        return new AdaptaterAuthRepository($c->get('client_auth'));
    },

    UsersServiceInterface::class => function (ContainerInterface $c){
        return new UsersService($c->get(UsersRepositoryInterface::class), $c->get(AuthRepositoryInterface::class), $c->get(CoursRepositoryInterface::class));
    },

    CoursRepositoryInterface::class => function (ContainerInterface $c) {
        return new AdaptaterCoursRepository($c->get('client_cours'));
    },

    GetUserById::class => function (ContainerInterface $c){
    return new GetUserById($c->get(UsersServiceInterface::class));
    },

    CreateUtilisateurAction::class => function (ContainerInterface $c) {
    return new CreateUtilisateurAction($c->get(UsersServiceInterface::class));
    },

    DeleteUserByIdAction::class => function (ContainerInterface $c) {
        return new DeleteUserByIdAction($c->get(UsersServiceInterface::class));
    },

    AuthServiceInterface::class => function (ContainerInterface $c) {
        return new AuthService($c->get(AuthRepositoryInterface::class));
    },

    AuthMiddleware::class => function (ContainerInterface $c) {
        return new AuthMiddleware($c->get(AuthServiceInterface::class));
    },

    AuthzMiddleware::class => function (ContainerInterface $c) {
        return new AuthzMiddleware($c->get(AuthServiceInterface::class));
    },

];