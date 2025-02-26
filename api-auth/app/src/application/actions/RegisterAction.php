<?php
namespace apiAuth\application\actions;

use apiAuth\application\providers\auth\AuthProviderInterface;
use apiAuth\core\dto\user\InputUserDTO;
use apiAuth\core\dto\user\ProviderUserDTO;
use apiAuth\core\services\user\UserServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;
use Slim\Exception\HttpUnauthorizedException;

class RegisterAction extends AbstractAction
{
    private UserServiceInterface $userService;
    private AuthProviderInterface $authProvider;

    public function __construct(UserServiceInterface $userService, AuthProviderInterface $authProvider)
    {
        $this->userService = $userService;
        $this->authProvider = $authProvider;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $params = $rq->getParsedBody() ?? null;

        if (!isset($params['email']) || !isset($params['mdp']) || !isset($params['name']) || !isset($params['surname'])) {
            throw new HttpBadRequestException($rq, 'Paramètres manquants');
        }

        $email = filter_var($params['email'], FILTER_SANITIZE_EMAIL);
        $name = filter_var($params['name'], FILTER_SANITIZE_SPECIAL_CHARS);
        $surname = filter_var($params['surname'], FILTER_SANITIZE_SPECIAL_CHARS);

        $pseudo = null;
        if (isset($params['pseudo'])) {
            $pseudo = filter_var($params['pseudo'], FILTER_SANITIZE_SPECIAL_CHARS);
        }

        $linkpic = "default.jpg";

        try {
            $this->userService->createUser(new InputUserDTO($email, $params['mdp'], $name, $surname, $linkpic, $pseudo));
        } catch (\apiAuth\application\actions\application\actions\Exception $e) {
            throw new HttpBadRequestException($rq, $e->getMessage());
        }

        try {
            $authRes = $this->authProvider->signIn(new ProviderUserDTO($email, $params['mdp']));
        } catch (\apiAuth\application\actions\application\actions\Exception $e) {
            throw new HttpUnauthorizedException($rq, 'Identifiants incorrects ' . $e->getMessage());
        }

        $response = [
            'type' => 'ressource',
            'atoken' => $authRes->accessToken,
            'rtoken' => $authRes->refreshToken,
        ];

        $rs->getBody()->write(json_encode($response));

        return $rs->withStatus(201)->withHeader('Content-Type', 'application/json');
    }
}