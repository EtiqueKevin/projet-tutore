<?php
declare(strict_types=1);

use apiCours\application\actions\lesson\DeleteLessonByIdAction;
use apiCours\application\actions\lesson\GetLessonByIdAction;
use apiCours\application\actions\lesson\GetLessonsAction;
use apiCours\application\actions\lesson\PostLessonAction;
use apiCours\application\actions\lesson\PutLessonByIdAction;
use apiCours\application\actions\module\DeleteModuleByIdAction;
use apiCours\application\actions\module\GetModuleByIdAction;
use apiCours\application\actions\module\GetModulesAction;
use apiCours\application\actions\module\PostModuleAction;
use apiCours\application\actions\module\PutChangeToJohnDoe;
use apiCours\application\actions\module\PutModuleByIdAction;
use Slim\App;

return function( App $app): App {
    //module, lesson
    $app->get('/modules[/]', GetModulesAction::class);
    $app->post('/modules[/]', PostModuleAction::class);
    $app->get('/modules/{id}[/]', GetModuleByIdAction::class);
    $app->delete('/modules/{id}[/]', DeleteModuleByIdAction::class);
    $app->put('/modules/{id}[/]', PutModuleByIdAction::class);

    $app->get('/modules/{id}/lessons[/]', GetLessonsAction::class);
    $app->post('/modules/{id}/lessons/[/]', PostLessonAction::class);
    $app->get('/modules/{id_module}/lessons/{id_lesson}[/]', GetLessonByIdAction::class);
    $app->delete('/modules/{id_module}/lessons/{id_lesson}[/]', DeleteLessonByIdAction::class);
    $app->put('/modules/{id_module}/lessons/{id_lesson}[/]', PutLessonByIdAction::class);

    $app->put('/users/{id}/modules/changeToJohnDoe', PutChangeToJohnDoe::class)
        ->setName('changeToJohnDoe');
    $app->get('/lessons/{id_lesson}[/]', GetLessonByIdAction::class);
    $app->delete('/lessons/{id_lesson}[/]', DeleteLessonByIdAction::class);
    $app->put('/lessons/{id_lesson}[/]', PutLessonByIdAction::class);
    return $app;
};