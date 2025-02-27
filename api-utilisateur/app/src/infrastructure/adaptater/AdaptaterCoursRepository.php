<?php

namespace apiUtilisateur\infrastructure\adaptater;

use apiUtilisateur\core\repositoryInterface\CoursRepositoryInterface;

class AdaptaterCoursRepository implements CoursRepositoryInterface
{
    private $client;

    public function __construct($client)
    {
        $this->client = $client;
    }

    public function changeToJohnDoe(string $id): void
    {
        $this->client->put('/users/'.$id. '/modules/changeToJohnDoe');
    }

    public function getModuleByLesson(string $idLesson, string $token): string
    {
        $response = $this->client->get('/lessons/'.$idLesson.'/module',
            ['headers' => ['Authorization' => 'Bearer '.$token]]
        );
        $data = json_decode($response->getBody()->getContents(), true);
        return $data['module']['id'];
    }

    public function getLessonsIdsByModule(string $idModule, $token): array
    {
        $response = $this->client->get('/modules/'.$idModule.'/lessons',
            ['headers' => ['Authorization' => 'Bearer '.$token]]
        );
        $lessonsIds = [];
        foreach ($response->getBody() as $lesson) {
            $lessonsIds[] = $lesson['id'];
        }
        return $lessonsIds;
    }
}