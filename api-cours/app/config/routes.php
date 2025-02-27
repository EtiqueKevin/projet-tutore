<?php
declare(strict_types=1);

use apiCours\application\actions\lesson\DeleteLessonByIdAction;
use apiCours\application\actions\lesson\GetExerciseByIndexByIdLesson;
use apiCours\application\actions\lesson\GetLessonByIdAction;
use apiCours\application\actions\lesson\GetLessonsAction;
use apiCours\application\actions\lesson\GetLessonsWithStatusAction;
use apiCours\application\actions\lesson\PostLessonAction;
use apiCours\application\actions\lesson\PutLessonByIdAction;
use apiCours\application\actions\module\DeleteModuleByIdAction;
use apiCours\application\actions\module\GetModuleByIdAction;
use apiCours\application\actions\module\GetModulesByProfAction;
use apiCours\application\actions\module\GetModulesAction;
use apiCours\application\actions\module\GetModulesWithStatusAction;
use apiCours\application\actions\module\PostModuleAction;
use apiCours\application\actions\module\PutChangeToJohnDoe;
use apiCours\application\actions\module\PutModuleByIdAction;
use apiCours\application\middleware\AuthMiddleware;
use apiCours\application\middleware\AuthzMiddleware;
use apiUtilisateur\application\actions\user\GetUsersAction;
use Slim\App;

return function( App $app): App {
    //module, lesson

    $app->get('/modules[/]', GetModulesAction::class);

    $app->get('/users/modules[/]', GetModulesByProfAction::class)
        ->add(AuthMiddleware::class);

    $app->post('/modules[/]', PostModuleAction::class)
    ->add(AuthMiddleware::class);


    $app->get('/modules/{id}[/]', GetModuleByIdAction::class);

    $app->delete('/modules/{id}[/]', DeleteModuleByIdAction::class)
        ->add(AuthzMiddleware::class)
        ->add(AuthMiddleware::class)
        ->setName('deleteModule');

    $app->put('/modules/{id}[/]', PutModuleByIdAction::class)
        ->add(AuthzMiddleware::class)
        ->add(AuthMiddleware::class)
        ->setName('putModule');

    $app->get('/modules/{id}/lessons[/]', GetLessonsAction::class);


    $app->post('/modules/{id}/lessons[/]', PostLessonAction::class)
        ->add(AuthzMiddleware::class)
        ->add(AuthMiddleware::class)
        ->setName('postLesson');

    $app->get('/modules/{id_module}/lessons/{id_lesson}[/]', GetLessonByIdAction::class);

    $app->delete('/modules/{id_module}/lessons/{id_lesson}[/]', DeleteLessonByIdAction::class)
        ->add(AuthzMiddleware::class)
        ->add(AuthMiddleware::class)
        ->setName('deleteLesson');

    $app->put('/users/{id}/modules/changeToJohnDoe', PutChangeToJohnDoe::class)
        ->setName('changeToJohnDoe');

    $app->get('/lessons/{id_lesson}[/]', GetLessonByIdAction::class);

    $app->put('/lessons/{id_lesson}[/]', PutLessonByIdAction::class)
        ->add(AuthzMiddleware::class)
        ->add(AuthMiddleware::class)
        ->setName('putLesson');;

    $app->get('/lessons/{id_lesson}/exercise/{index}[/]', GetExerciseByIndexByIdLesson::class);


    return $app;
};