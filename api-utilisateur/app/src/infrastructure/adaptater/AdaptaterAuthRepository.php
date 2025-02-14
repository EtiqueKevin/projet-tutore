<?php

namespace apiUtilisateur\infrastructure\adaptater;

use apiUtilisateur\core\repositoryInterface\AuthRepositoryInterface;

class AdaptaterAuthRepository implements AuthRepositoryInterface
{
    private $client;

    public function __construct($client)
    {
        $this->client = $client;
    }

    public function getUtilisateurId(string $token): string
    {
        $response = $this->client->post('/token/user/id', [
            'headers' => ['Authorization' => 'Bearer '.$token]
        ]);
        $data = json_decode($response->getBody()->getContents(), true);
        return $data["userID"];
    }
}