
<?php


use gateway\application\actions\GeneriqueCoursAction;
use gateway\application\actions\GeneriqueExecutionAction;
use gateway\application\actions\GeneriqueUtilisateurAction;
use gateway\application\middleware\AuthMiddleware;
use GuzzleHttp\Client;
use Psr\Container\ContainerInterface;
return [

    'client_utilisateur' => function (ContainerInterface $c){
        return new Client(['base_uri' => 'http://api.praticiens.toubeelib:80']);
    },

    'client_cours' => function (ContainerInterface $c){
        return new Client(['base_uri' => 'http://api.rdv.toubeelib:80']);
    },

    'client_execution' => function (ContainerInterface $c){
        return new Client(['base_uri' => 'http://api.patient.toubeelib:80']);
    },

    GeneriqueCoursAction::class => function (ContainerInterface $c){
        return new GeneriqueCoursAction($c->get('client_cours'));
    },

    GeneriqueUtilisateurAction::class => function (ContainerInterface $c){
        return new GeneriqueUtilisateurAction($c->get('client_utilisateur'));
    },

    GeneriqueExecutionAction::class => function (ContainerInterface $c){
        return new GeneriqueExecutionAction($c->get('client_execution'));
    },

    AuthMiddleware::class => function (ContainerInterface $c) {
        return new AuthMiddleware($c->get('client_auth'));
    },


];

