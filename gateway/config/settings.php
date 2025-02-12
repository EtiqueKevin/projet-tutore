<?php

use GuzzleHttp\Client;
use Psr\Container\ContainerInterface;

return  [
    'client_utilisateur' => function (ContainerInterface $c){
        return new Client(['base_uri' => 'http://api.utilisateur.jeancademie:8889']);
    },

    'client_cours' => function (ContainerInterface $c){
        return new Client(['base_uri' => 'http://api.cours.jeancademie:8888']);
    },

    'client_execution' => function (ContainerInterface $c){
        return new Client(['base_uri' => 'http://api.execution.jeancademie:80']);
    },
];