<?php
declare(strict_types=1);

use apiCours\application\actions\lesson\GetLessonsAction;
use apiCours\application\actions\lesson\GetLessonByIdAction;
use apiCours\application\actions\lesson\PostLessonAction;
use apiCours\application\actions\lesson\PutLessonByIdAction;
use apiCours\application\actions\module\GetModulesAction;
use apiCours\application\actions\module\PostModuleAction;
use Slim\App;

return function( App $app): App {
    //module, lesson
    $app->get('/modules[/]', GetModulesAction::class);
    $app->post('/modules[/]', PostModuleAction::class);
    $app->get('/modules/{id}[/]', GetModuleByIdAction::class);
    $app->get('/modules/{id}/lessons[/]', GetLessonsAction::class);
    $app->post('/modules/{id}/lessons/[/]', PostLessonAction::class);
    $app->get('/modules/{id_module}/lessons/{id_lesson}[/]', GetLessonByIdAction::class);
    $app->put('/modules/{id_module}/lessons/{id_lesson}[/]', PutLessonByIdAction::class);
    return $app;
};