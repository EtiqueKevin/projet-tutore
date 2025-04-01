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
        $config = parse_ini_file(__DIR__ . '/iniconf/cours.db.ini');
        $uri = "mongodb://{$config['host']}:{$config['port']}";
        $options = [
            "username" => $config['username'],
            "password" => $config['password']
        ];
        $client = new MongoDB\Client($uri, $options);
        $database = $client->{$config['database']};
        return $database;
    },

    'client_utilisateur' => function (ContainerInterface $c){
        return new Client(['base_uri' => 'http://api.utilisateur.jeancademie:80']);
    },

    'client_auth' => function (ContainerInterface $c){
        return new Client(['base_uri' => 'http://api.auth.jeancademie:80']);
    },
];