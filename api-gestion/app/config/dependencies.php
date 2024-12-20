<?php

use apiGestion\application\actions\user\GetUserByIdAction;
use apiGestion\application\providers\auth\JWTManager;
use apiGestion\core\repositoryInterface\UserRepositoryInterface;
use apiGestion\core\services\user\UserService;
use apiGestion\core\services\user\UserServiceInterface;
use apiGestion\infrastructure\UserRepository;
use Psr\Container\ContainerInterface;

return [


    //JWT
    JWTManager::class => function(ContainerInterface $c){
        return new JWTManager($c->get('SECRET_KEY'));
    },

    //actions
    GetUserByIdAction::class => function(ContainerInterface $c){
        return new GetUserByIdAction($c->get(UserServiceInterface::class));
    },

    //services
    UserServiceInterface::class => function(ContainerInterface $c){
        return new UserService($c->get(UserRepositoryInterface::class));
    },

    //repository
    UserRepositoryInterface::class => function(ContainerInterface $c){
        return new UserRepository();
    },




];