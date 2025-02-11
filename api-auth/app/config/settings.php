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

    'auth.jeancademydb.pdo' => function (ContainerInterface $c) {
        $config = parse_ini_file('iniconf/auth.db.ini');
        $dsn = "{$config['driver']}:host={$config['host']};port={$config['port']};dbname={$config['database']};";
        $user = $config['username'];
        $password = $config['password'];
        return new \PDO($dsn, $user, $password, [\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION]);
    },

    'client_utilisateur' => function (ContainerInterface $c){
        return new Client(['base_uri' => 'http://api.utilisateur.jeancademie:8889']);
    },

    'SECRET_KEY' => getenv('JWT_SECRET_KEY'),

    ];