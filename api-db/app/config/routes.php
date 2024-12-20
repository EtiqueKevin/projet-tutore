<?php
declare(strict_types=1);

use apiDB\application\actions\HomeAction;
use apiDB\application\actions\user\GetUserById;
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
    $app->get('/', HomeAction::class);

    $app->get('/user/{ID-USER}[/]',GetUserById::class);

    return $app;
};