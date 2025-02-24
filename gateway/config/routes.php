<?php
declare(strict_types=1);

use gateway\application\actions\GeneriqueCoursAction;
use gateway\application\actions\GeneriqueUtilisateurAction;
use gateway\application\middleware\AuthMiddleware;
use gateway\application\actions\GeneriqueAuthnAction;
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
    $app->get('/modules[/]', GeneriqueCoursAction::class);
    $app->post('/modules[/]', GeneriqueCoursAction::class);
    $app->get('/modules/{id}[/]', GeneriqueCoursAction::class);
    $app->delete('/modules/{id}[/]', GeneriqueCoursAction::class);
    $app->put('/modules/{id}[/]', GeneriqueCoursAction::class);

    $app->get('/modules/{id}/lessons[/]', GeneriqueCoursAction::class);
    $app->post('/modules/{id}/lessons/[/]', GeneriqueCoursAction::class);
    $app->get('/lessons/{id_lesson}[/]', GeneriqueCoursAction::class);
    $app->delete('/lessons/{id_lesson}[/]', GeneriqueCoursAction::class);
    $app->put('/lessons/{id_lesson}[/]', GeneriqueCoursAction::class);
    
    /*************************
     * Routes de l'API Execution
     *************************/



    /*************************
     * Routes de l'API Auth
     *************************/

    $app->post('/signin[/]', GeneriqueAuthnAction::class)
        ->setName('usersSignIn');

    $app->post('/register[/]', GeneriqueAuthnAction::class)
        ->setName('usersRegister');

    $app->post('/refresh[/]', GeneriqueAuthnAction::class)
        ->add(AuthMiddleware::class)
        ->setName('usersRefresh');

    /*************************
     * Routes de l'API Utilisateur
     *************************/

    $app->put('/users[/]', GeneriqueUtilisateurAction::class);

    return $app;
};

