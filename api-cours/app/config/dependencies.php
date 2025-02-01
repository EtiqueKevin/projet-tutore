<?php

use apiGestion\application\actions\lesson\GetLessonByIdAction;
use apiGestion\application\actions\user\GetUserByIdAction;
use apiGestion\application\providers\auth\JWTManager;
use apiCours\core\repositoryInterface\LessonRepositoryInterface;
use apiCours\core\repositoryInterface\UserRepositoryInterface;
use apiCours\core\services\lesson\LessonService;
use apiCours\core\services\lesson\LessonServiceInterface;
use apiGestion\core\services\user\UserService;
use apiGestion\core\services\user\UserServiceInterface;
use apiCours\infrastructure\LessonRepository;
use apiCours\infrastructure\UserRepository;
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