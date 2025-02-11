<?php
namespace apiAuth\core\services\auth;

use apiAuth\core\dto\user\ProviderUserDTO;
use apiAuth\core\repositoryInterface\AuthRepositoryInterface;
use apiAuth\core\dto\user\InputUserDTO;
use apiAuth\core\dto\user\UserDTO;
use Psr\Log\LoggerInterface;
use Monolog\Level;

class AuthService implements AuthServiceInterface
{
    private AuthRepositoryInterface $authRepository;


    public function __construct(AuthRepositoryInterface $authRepository){
        $this->authRepository = $authRepository;
    }

    public function verifyCredentials(ProviderUserDTO $input): UserDTO
    {
        try {
            $user = $this->authRepository->findByEmail($input->email);

            if ($user && password_verify($input->password, $user->password)) {

                return new UserDTO(
                    $user->ID,
                    $user->email,
                    $user->role
                );
            }else{
                throw new AuthServiceException('Identifiants incorrects');
            }
        }catch(\Exception $e){
            throw new AuthServiceException('Erreur de connexion');
        }
    }
}