<?php
declare(strict_types=1);

use gateway\application\actions\GeneriqueCoursAction;
use gateway\application\actions\GeneriqueUtilisateurAction;
use gateway\application\actions\GeneriqueExecutionAction;
use gateway\application\middleware\AuthMiddleware;
use gateway\application\middleware\Cors;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Slim\App;


return function( App $app): App {

    $app->add(Cors::class);

    $app->options('/{routes:.+}',
        function( Request $rq,
                  Response $rs, array $args) : Response {
            return $rs;
        });

    /*************************
    * Routes de l'API Cours
    *************************/


    
    /*************************
     * Routes de l'API Execution
     *************************/



    /*************************
     * Routes de l'API Utilisateur
     *************************/

    $app->post('/users/signin[/]', GeneriqueUtilisateurAction::class)
        ->setName('usersSignIn');

    $app->post('/users/register[/]', GeneriqueUtilisateurAction::class)
        ->setName('usersRegister');

    $app->post('/users/refresh[/]', GeneriqueUtilisateurAction::class)
        ->add(AuthMiddleware::class)
        ->setName('usersRefresh');

    return $app;
};

