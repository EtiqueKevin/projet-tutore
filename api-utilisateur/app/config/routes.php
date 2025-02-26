<?php
declare(strict_types=1);

use apiUtilisateur\application\actions\HomeAction;
use apiUtilisateur\application\actions\user\CreateUtilisateurAction;
use apiUtilisateur\application\actions\user\DeleteUtilisateurAction;
use apiUtilisateur\application\actions\user\GetLessonStatusAction;
use apiUtilisateur\application\actions\user\GetModuleStatusAction;
use apiUtilisateur\application\actions\user\GetUserById;
use apiUtilisateur\application\actions\user\GetUserByTokenAction;
use apiUtilisateur\application\actions\user\GetUsersAction;
use apiUtilisateur\application\actions\user\PostFinishLessonAction;
use apiUtilisateur\application\actions\user\PostStartLessonAction;
use apiUtilisateur\application\actions\user\PutUitlisateurAction;
use apiUtilisateur\application\actions\user\SignInAction;
use apiUtilisateur\application\middleware\AuthMiddleware;
use apiUtilisateur\application\middleware\AuthzMiddleware;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
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
    $app->get('/user[/]', GetUserByTokenAction::class)
        ->add(AuthMiddleware::class)
        ->setName('getUserByToken');

    $app->get('/users[/]', GetUsersAction::class)
        ->setName('getUtilisateurs');

    $app->get('/users/{ID-USER}[/]',GetUserById::class)
        ->setName('getUtilisateur');


    $app->post('/users[/]',CreateUtilisateurAction::class)
        ->setName('createUtilisateur');

    $app->put('/users/[/]',PutUitlisateurAction::class)
        ->add(AuthMiddleware::class)
        ->setName('updateUtilisateur');

    $app->delete('/users/{ID-USER}[/]',DeleteUtilisateurAction::class)
        ->add(AuthzMiddleware::class)
        ->add(AuthMiddleware::class)
        ->setName('deleteUtilisateur');

    $app->post('/lessons/{ID-LESSON}/finish_lesson[/]', PostFinishLessonAction::class)
        ->add(AuthMiddleware::class);

    $app->post('/lessons/{ID-LESSON}/start_lesson[/]', PostStartLessonAction::class)
        ->add(AuthMiddleware::class);

    $app->get('/lessons/status[/]', GetLessonStatusAction::class)
        ->add(AuthMiddleware::class)
        ->setName('getLessonStatus');

    $app->get('/modules/status[/]', GetModuleStatusAction::class)
        ->add(AuthMiddleware::class)
        ->setName('getModuleStatus');

    return $app;
};