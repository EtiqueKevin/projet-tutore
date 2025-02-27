<?php

use GuzzleHttp\Client;
use Psr\Container\ContainerInterface;

return  [
    'client_utilisateur' => function (ContainerInterface $c){
        return new Client(['base_uri' => 'http://api.utilisateur.jeancademie:80']);
    },

    'client_cours' => function (ContainerInterface $c){
        return new Client(['base_uri' => 'http://api.cours.jeancademie:80']);
    },

    'client_execution' => function (ContainerInterface $c){
        return new Client(['base_uri' => 'http://api.execution:3000']);
    },

    'client_authn' => function (ContainerInterface $c){
        return new Client(['base_uri' => 'http://api.auth.jeancademie:80']);
    },
];