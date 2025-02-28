<?php

namespace apiCours\infrastructure;

use apiCours\core\repositoryInterface\UtilisateurRepositoryInterface;

class AdapterUtilisateurRepository implements UtilisateurRepositoryInterface
{
    private $client;

    public function __construct($client)
    {
        $this->client = $client;
    }

    public function getModulesStatus(string $token): array
    {
        $reponse = $this->client->get('/modules/status', [
            'headers' => ['Authorization' => 'Bearer '.$token]
        ]);

        $data = json_decode($reponse->getBody()->getContents(), true);
        return $data["modules"];

    }

    public function getLessonsStatus(string $token): array
    {
        $reponse = $this->client->get('/lessons/status', [
            'headers' => ['Authorization' => 'Bearer '.$token]
        ]);

        $data = json_decode($reponse->getBody()->getContents(), true);
        return $data["lessons"];
    }

    public function getLessonStatus(string $token, string $idLesson): int{
        $reponse = $this->client->get('/lessons/'.$idLesson.'/status', [
            'headers' => ['Authorization' => 'Bearer '.$token]
        ]);

        $data = json_decode($reponse->getBody()->getContents(), true);
        return $data["status"];
    }

    public function getMoyenneNoteModule(string $id_module) : float
    {
        $reponse = $this->client->get('/modules/'.$id_module.'/rate');
        $data = json_decode($reponse->getBody()->getContents(), true);
        return $data["rate"];
    }
}