<?php

use apiCours\application\actions\lesson\GetLessonByIdAction;
use apiCours\application\actions\lesson\PostLessonAction;
use apiCours\application\actions\lesson\PutLessonByIdAction;
use apiCours\application\actions\module\GetModuleByIdAction;
use apiCours\application\actions\module\GetModulesAction;
use apiCours\core\repositoryInterface\LessonRepositoryInterface;
use apiCours\core\repositoryInterface\ModuleRepositoryInterface;
use apiCours\core\services\lesson\LessonService;
use apiCours\core\services\lesson\LessonServiceInterface;
use apiCours\core\services\module\ModuleService;
use apiCours\core\services\module\ModuleServiceInterface;
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
        return new PostLessonAction($c->get(LessonServiceInterface::class));
    },
    PutLessonByIdAction::class => function(ContainerInterface $c){
        return new PutLessonByIdAction($c->get(LessonServiceInterface::class));
    },
    GetLessonByIdAction::class => function(ContainerInterface $c){
        return new GetLessonByIdAction($c->get(LessonServiceInterface::class));
    },

    //services
    LessonServiceInterface::class => function(ContainerInterface $c){
        return new LessonService($c->get(LessonRepositoryInterface::class));
    },
    ModuleServiceInterface::class => function(ContainerInterface $c){
        return new ModuleService($c->get(ModuleRepositoryInterface::class));
    },

    //repository

    LessonRepositoryInterface::class => function(ContainerInterface $c){
        return new LessonRepository();
    },
    ModuleRepositoryInterface::class => function(ContainerInterface $c){
        return new ModuleRepository($c->get('database'));
    }
];