<?php
declare(strict_types=1);

use apiGestion\application\actions\HomeAction;
use apiGestion\application\actions\user\GetUserByIdAction;
use Slim\App;

return function( App $app): App {

    //$app->add(Cors::class);
/*
    $app->options('/{routes:.+}',
        function( Request $rq,
                  Response $rs, array $args) : Response {
            return $rs;
        });
*/
    $app->get('/', HomeAction::class);

    //user
    $app->get('/user/{id}[/]', GetUserByIdAction::class);

    //module, lesson
    $app->get('module[/]', GetModuleAction::class);
    $app->post('module[/]', PostModuleAction::class);
    $app->get('module/{id}[/]', GetModuleByIdAction::class);
    $app->get('module/{id}/lessons[/]', GetLessonAction::class);
    $app->post('module/{id}/lessons/[/]', PostLessonAction::class);
    $app->get('module/{id}/lessons/{id}[/]', GetLessonByIdAction::class);

    //exec code
    $app->post('exec[/]', ExecCodeAction::class);

    return $app;
};