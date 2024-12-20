<?php

use apiGestion\application\actions\lesson\GetLessonByIdAction;
use apiGestion\application\actions\user\GetUserByIdAction;
use apiGestion\application\providers\auth\JWTManager;
use apiGestion\core\repositoryInterface\LessonRepositoryInterface;
use apiGestion\core\repositoryInterface\UserRepositoryInterface;
use apiGestion\core\services\lesson\LessonService;
use apiGestion\core\services\lesson\LessonServiceInterface;
use apiGestion\core\services\user\UserService;
use apiGestion\core\services\user\UserServiceInterface;
use apiGestion\infrastructure\LessonRepository;
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
    GetLessonByIdAction::class => function(ContainerInterface $c){
        return new GetLessonByIdAction($c->get(LessonServiceInterface::class));
    },

    //services
    UserServiceInterface::class => function(ContainerInterface $c){
        return new UserService($c->get(UserRepositoryInterface::class));
    },
    LessonServiceInterface::class => function(ContainerInterface $c){
        return new LessonService($c->get(LessonRepositoryInterface::class));
    },

    //repository
    UserRepositoryInterface::class => function(ContainerInterface $c){
        return new UserRepository();
    },
    LessonRepositoryInterface::class => function(ContainerInterface $c){
        return new LessonRepository();
    },
];