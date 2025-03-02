<?php
declare(strict_types=1);

use gateway\application\actions\GeneriqueCoursAction;
use gateway\application\actions\GeneriqueExecutionAction;
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
    $app->post('/modules/{id}/lessons[/]', GeneriqueCoursAction::class);
    $app->get('/lessons/{id_lesson}[/]', GeneriqueCoursAction::class);
    $app->delete('/lessons/{id_lesson}[/]', GeneriqueCoursAction::class);
    $app->put('/lessons/{id_lesson}[/]', GeneriqueCoursAction::class);
    $app->delete('/modules/{id_module}/lessons/{id_lesson}[/]', GeneriqueCoursAction::class);

    $app->get('/users/modules[/]', GeneriqueCoursAction::class);
    


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

    $app->post('/users/profile[/]', GeneriqueUtilisateurAction::class);
    $app->get('/users[/]', GeneriqueUtilisateurAction::class);
    $app->get('/user[/]', GeneriqueUtilisateurAction::class);
    $app->get('/assets/{file}', GeneriqueUtilisateurAction::class);
    $app->delete('/users/{id}[/]', GeneriqueUtilisateurAction::class);
    $app->post('/lessons/{ID-LESSON}/finish_lesson[/]', GeneriqueUtilisateurAction::class);
    $app->post('/lessons/{ID-LESSON}/start_lesson[/]', GeneriqueUtilisateurAction::class);
    $app->post('/modules/{ID-MODULE}/rate[/]', GeneriqueUtilisateurAction::class);

    $app->get('/demandes[/]', GeneriqueUtilisateurAction::class);
    $app->post('/demandes[/]', GeneriqueUtilisateurAction::class);
    $app->post('/demandes/{ID-DEMANDE}/validate[/]', GeneriqueUtilisateurAction::class);
    $app->delete('/demandes/{ID-DEMANDE}[/]', GeneriqueUtilisateurAction::class);


    /*************************
     * Routes de l'API Execution
     *************************/
    $app->post('/{language}', GeneriqueExecutionAction::class)
        ->setName('execution');


    return $app;
};

