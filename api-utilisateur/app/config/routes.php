<?php
declare(strict_types=1);

use apiUtilisateur\application\actions\HomeAction;
use apiUtilisateur\application\actions\user\CreateUtilisateurAction;
use apiUtilisateur\application\actions\user\DeleteDemandeAction;
use apiUtilisateur\application\actions\user\DeleteUtilisateurAction;
use apiUtilisateur\application\actions\user\GetDemandesAction;
use apiUtilisateur\application\actions\user\GetLessonStatusAction;
use apiUtilisateur\application\actions\user\GetLessonStatusByIdAction;
use apiUtilisateur\application\actions\user\GetModuleStatusAction;
use apiUtilisateur\application\actions\user\GetModuleStatusByIdAction;
use apiUtilisateur\application\actions\user\GetRateOfModuleAction;
use apiUtilisateur\application\actions\user\GetUserById;
use apiUtilisateur\application\actions\user\GetUserByTokenAction;
use apiUtilisateur\application\actions\user\GetUsersAction;
use apiUtilisateur\application\actions\user\PostDemandeAction;
use apiUtilisateur\application\actions\user\PostDemandeValidateAction;
use apiUtilisateur\application\actions\user\PostFinishLessonAction;
use apiUtilisateur\application\actions\user\PostRateOfModuleAction;
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
        ->add(AuthzMiddleware::class)
        ->add(AuthMiddleware::class)
        ->setName('getUtilisateurs');

    $app->get('/users/{ID-USER}[/]',GetUserById::class)
        ->setName('getUtilisateur');

    $app->post('/users[/]',CreateUtilisateurAction::class)
        ->setName('createUtilisateur');

    $app->post('/users/profile[/]',PutUitlisateurAction::class)
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

    $app->get('/lessons/{ID-LESSON}/status[/]', GetLessonStatusByIdAction::class)
        ->add(AuthMiddleware::class)
        ->setName('getLessonStatus');

    $app->get('/modules/{ID-MODULE}/status[/]', GetModuleStatusByIdAction::class)
        ->add(AuthMiddleware::class)
        ->setName('getModuleStatus');

    $app->post('/modules/{ID-MODULE}/rate[/]', PostRateOfModuleAction::class)
        ->add(AuthMiddleware::class);

    $app->get('/modules/{ID-MODULE}/rate[/]', GetRateOfModuleAction::class);

    $app->get('/demandes[/]', GetDemandesAction::class)
        ->add(AuthzMiddleware::class)
        ->add(AuthMiddleware::class)
        ->setName('getDemandes');

    $app->post('/demandes[/]', PostDemandeAction::class)
        ->add(AuthzMiddleware::class)
        ->add(AuthMiddleware::class)
        ->setName('postDemande');

    $app->post('/demandes/{ID-DEMANDE}/validate[/]', PostDemandeValidateAction::class)
        ->add(AuthzMiddleware::class)
        ->add(AuthMiddleware::class)
        ->setName('validerDemande');

    $app->delete('/demandes/{ID-DEMANDE}[/]', DeleteDemandeAction::class)
        ->add(AuthzMiddleware::class)
        ->add(AuthMiddleware::class)
        ->setName('deleteDemande');

    return $app;
};