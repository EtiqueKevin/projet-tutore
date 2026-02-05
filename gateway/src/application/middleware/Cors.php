<?php

namespace gateway\application\middleware;

use DateTime;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Exception\HttpUnauthorizedException;

class Cors{

    private array $allowedOrigins = [];

    // Patterns pour les réseaux locaux (avec ou sans port)
    private array $allowedPatterns = [
        '/^https?:\/\/localhost(:\d+)?$/',
        '/^https?:\/\/127\.0\.0\.1(:\d+)?$/',
        '/^https?:\/\/192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/',
        '/^https?:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/',
        '/^https?:\/\/172\.(1[6-9]|2[0-9]|3[0-1])\.\d{1,3}\.\d{1,3}(:\d+)?$/',
    ];

    public function __construct() {
        // Charge les origines autorisées depuis la variable d'environnement
        // Format: CORS_ALLOWED_ORIGINS="https://domain1.com,https://domain2.com"
        $envOrigins = getenv('CORS_ALLOWED_ORIGINS') ?: $_ENV['CORS_ALLOWED_ORIGINS'] ?? '';
        if (!empty($envOrigins)) {
            $this->allowedOrigins = array_map('trim', explode(',', $envOrigins));
        }
    }

    /**
     * Vérifie si l'origine est autorisée
     */
    private function isOriginAllowed(string $origin): bool {
        // Vérification exacte
        if (in_array($origin, $this->allowedOrigins)) {
            return true;
        }

        // Vérification par pattern (réseaux locaux)
        foreach ($this->allowedPatterns as $pattern) {
            if (preg_match($pattern, $origin)) {
                return true;
            }
        }

        return false;
    }

    /**
     * GERE LES REQUETES CORS
     * @param ServerRequestInterface $rq
     * @param RequestHandlerInterface $next
     * @return ResponseInterface
     */
    public function __invoke(ServerRequestInterface $rq, RequestHandlerInterface $next): ResponseInterface {
        // Gérer les requêtes OPTIONS (preflight)
        if ($rq->getMethod() === 'OPTIONS') {
            $origin = $rq->getHeaderLine('Origin');
            if ($this->isOriginAllowed($origin)) {
                $response = new \Slim\Psr7\Response();
                return $response
                    ->withHeader('Access-Control-Allow-Origin', $origin)
                    ->withHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, PATCH, DELETE, OPTIONS')
                    ->withHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')
                    ->withHeader('Access-Control-Max-Age', 3600)
                    ->withHeader('Access-Control-Allow-Credentials', 'true')
                    ->withStatus(204);
            }
        }

        if (!$rq->hasHeader('Origin')) {
            throw new HttpUnauthorizedException($rq, "missing Origin Header (cors)");
        }

        $origin = $rq->getHeaderLine('Origin');

        if (!$this->isOriginAllowed($origin)) {
            throw new HttpUnauthorizedException($rq, "Origin not allowed (cors)");
        }

        $response = $next->handle($rq);

        $response = $response
            ->withHeader('Access-Control-Allow-Origin', $origin)
            ->withHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, PATCH, DELETE, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')
            ->withHeader('Access-Control-Max-Age', 3600)
            ->withHeader('Access-Control-Allow-Credentials', 'true');

        return $response;
    }
}