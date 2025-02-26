<?php

use apiCours\application\actions\lesson\GetExerciseByIndexByIdLesson;
use apiCours\application\actions\lesson\GetLessonByIdAction;
use apiCours\application\actions\lesson\PostLessonAction;
use apiCours\application\actions\lesson\PutLessonByIdAction;
use apiCours\application\actions\module\GetModuleByIdAction;
use apiCours\application\actions\module\GetModulesByProfAction;
use apiCours\application\actions\module\GetModulesAction;
use apiCours\application\middleware\AuthMiddleware;
use apiCours\core\repositoryInterface\AuthRepositoryInterface;
use apiCours\core\repositoryInterface\LessonRepositoryInterface;
use apiCours\core\repositoryInterface\ModuleRepositoryInterface;
use apiCours\core\repositoryInterface\UtilisateurRepositoryInterface;
use apiCours\core\services\auth\AuthService;
use apiCours\core\services\auth\AuthServiceInterface;
use apiCours\core\services\lesson\LessonService;
use apiCours\core\services\lesson\LessonServiceInterface;
use apiCours\core\services\module\ModuleService;
use apiCours\core\services\module\ModuleServiceInterface;
use apiCours\infrastructure\AdapterAuthRepository;
use apiCours\infrastructure\AdapterUtilisateurRepository;
use apiCours\infrastructure\LessonRepository;
use apiCours\infrastructure\ModuleRepository;
use Psr\Container\ContainerInterface;

return [

    GetModulesAction::class => function(ContainerInterface $c){
        return new GetModulesAction($c->get(ModuleServiceInterface::class));
    },
    GetModuleByIdAction::class => function(ContainerInterface $c){
        return new GetModuleByIdAction($c->get(ModuleServiceInterface::class));
    },

    PostLessonAction::class => function(ContainerInterface $c){
        return new PostLessonAction($c->get(LessonServiceInterface::class),$c->get(ModuleServiceInterface::class));
    },
    PutLessonByIdAction::class => function(ContainerInterface $c){
        return new PutLessonByIdAction($c->get(LessonServiceInterface::class));
    },
    GetLessonByIdAction::class => function(ContainerInterface $c){
        return new GetLessonByIdAction($c->get(LessonServiceInterface::class));
    },

    GetExerciseByIndexByIdLesson::class => function(ContainerInterface $c){
        return new GetExerciseByIndexByIdLesson($c->get(LessonServiceInterface::class));
    },

    GetModulesByProfAction::class => function(ContainerInterface $c){
        return new GetModulesByProfAction($c->get(ModuleServiceInterface::class));
    },

    //services
    LessonServiceInterface::class => function(ContainerInterface $c){
        return new LessonService($c->get(LessonRepositoryInterface::class), $c->get(UtilisateurRepositoryInterface::class));
    },
    ModuleServiceInterface::class => function(ContainerInterface $c){
        return new ModuleService($c->get(ModuleRepositoryInterface::class), $c->get(UtilisateurRepositoryInterface::class) );
    },
    AuthServiceInterface::class => function(ContainerInterface $c){
        return new AuthService($c->get(AuthRepositoryInterface::class), $c->get(ModuleRepositoryInterface::class));
    },

    //repository

    LessonRepositoryInterface::class => function(ContainerInterface $c){
        return new LessonRepository($c->get('database'));
    },
    ModuleRepositoryInterface::class => function(ContainerInterface $c){
        return new ModuleRepository($c->get('database'));
    },
    AuthRepositoryInterface::class => function(ContainerInterface $c){
        return new AdapterAuthRepository($c->get('client_auth'));
    },

    UtilisateurRepositoryInterface::class => function(ContainerInterface $c){
        return new AdapterUtilisateurRepository($c->get('client_utilisateur'));
    },

    // middleware
    AuthMiddleware::class => function(ContainerInterface $c){
        return new AuthMiddleware($c->get(AuthServiceInterface::class));
    },
];