<?php

use GuzzleHttp\Client;
use Monolog\Handler\StreamHandler;
use Monolog\Level;
use Monolog\Logger;
use Psr\Container\ContainerInterface;

return  [

    'displayErrorDetails' => true,
    'logs.dir' => __DIR__ . '/../var/logs',
    'logs.name' => 'apiGestion.log',
    'logs.level' => Level::Info,

    'logger' => function( ContainerInterface $c) {
        $log = new Logger( $c->get('logs.name'));
        $log->pushHandler(
            new StreamHandler($c->get('logs.dir'),
                $c->get('logs.level')));
        return $log;
    },

    'SECRET_KEY' => getenv('JWT_SECRET_KEY'),

    'database' => function (ContainerInterface $c) {
        $client = new MongoDB\Client('mongodb://mongo.jeancademie:27017', ["username" => "root", "password" => "root"]);
        $database = $client->cours;
        return $database;
    },

    'client_auth' => function (ContainerInterface $c){
        return new Client(['base_uri' => 'http://api.auth.jeancademie:8890']);
    },
];
