<?php
declare(strict_types=1);

use apiUtilisateur\application\actions\HomeAction;
use apiUtilisateur\application\actions\user\CreateUtilisateurAction;
use apiUtilisateur\application\actions\user\DeleteUtilisateurAction;
use apiUtilisateur\application\actions\user\GetUserById;
use apiUtilisateur\application\actions\user\GetUsersAction;
use apiUtilisateur\application\actions\user\PutUitlisateurAction;
use apiUtilisateur\application\actions\user\SignInAction;
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

    $app->get('/users[/]', GetUsersAction::class)
        ->setName('getUtilisateurs');

    $app->get('/users/{ID-USER}[/]',GetUserById::class)
        ->setName('getUtilisateur');


    $app->post('/users[/]',CreateUtilisateurAction::class)
        ->setName('createUtilisateur');

    $app->put('/users/[/]',PutUitlisateurAction::class)
        ->setName('updateUtilisateur');

    $app->delete('/users/{ID-USER}[/]',DeleteUtilisateurAction::class)
        ->setName('deleteUtilisateur');

    return $app;
};