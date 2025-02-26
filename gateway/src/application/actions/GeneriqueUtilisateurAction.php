<?php

namespace gateway\application\actions;

use GuzzleHttp\ClientInterface;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\ServerException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;
use Slim\Exception\HttpForbiddenException;
use Slim\Exception\HttpInternalServerErrorException;
use Slim\Exception\HttpNotFoundException;
use Slim\Exception\HttpUnauthorizedException;

class GeneriqueUtilisateurAction extends AbstractAction
{

    private ClientInterface $remote_api;

    public function __construct(ClientInterface $api_client)
    {
        $this->remote_api = $api_client;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $method = $rq->getMethod();
        $path = $rq->getUri()->getPath();
        $options = ['query' => $rq->getQueryParams()];
    
        // Handle Authorization header
        $auth = $rq->getHeader('Authorization') ?? null;
        if (!empty($auth)) {
            $options['headers'] = ['Authorization' => $auth[0]];
        }
    
        // Handle request body based on content type
        if ($method === 'POST' || $method === 'PUT' || $method === 'PATCH') {
            $contentType = $rq->getHeaderLine('Content-Type');
            
            if (strpos($contentType, 'multipart/form-data') !== false) {
                // Handle multipart form data
                $multipart = [];
                
                // Handle regular form fields
                $parsedBody = $rq->getParsedBody() ?? [];
                foreach ($parsedBody as $key => $value) {
                    $multipart[] = [
                        'name' => $key,
                        'contents' => $value
                    ];
                }
                
                // Handle uploaded files
                $uploadedFiles = $rq->getUploadedFiles();
                foreach ($uploadedFiles as $key => $file) {
                    if ($file->getError() === UPLOAD_ERR_OK) {
                        $multipart[] = [
                            'name' => $key,
                            'contents' => fopen($file->getStream()->getMetadata('uri'), 'r'),
                            'filename' => $file->getClientFilename(),
                            'headers' => [
                                'Content-Type' => $file->getClientMediaType()
                            ]
                        ];
                    }
                }
                
                $options['multipart'] = $multipart;
            } else {
                // Handle regular JSON requests
                $options['json'] = $rq->getParsedBody();
            }
        }
    
        try {
            $rs = $this->remote_api->request($method, $path, $options);
        } catch (ConnectException | ServerException $e) {
            throw new HttpInternalServerErrorException($rq, "The remote server is not available");
        } catch (ClientException $e) {
            match($e->getCode()) {
                400 => throw new HttpBadRequestException($rq, "The request is invalid". $e->getMessage()),
                401 => throw new HttpUnauthorizedException($rq, "You are not authorized to access this resource"),
                403 => throw new HttpForbiddenException($rq, "You are not allowed to access this resource"),
                404 => throw new HttpNotFoundException($rq, "The requested resource was not found"),
                default => throw new HttpInternalServerErrorException($rq, "An unexpected error occurred")
            };
        }
        
        return $rs;
    }
}