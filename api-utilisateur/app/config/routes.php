<?php
declare(strict_types=1);

use apiUtilisateur\application\actions\HomeAction;
use apiUtilisateur\application\actions\user\CreateUtilisateurAction;
use apiUtilisateur\application\actions\user\GetUserById;
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

    $app->get('/user/{ID-USER}[/]',GetUserById::class);

    $app->post('/user[/]',CreateUtilisateurAction::class)
        ->setName('createUtilisateur');

    return $app;
};