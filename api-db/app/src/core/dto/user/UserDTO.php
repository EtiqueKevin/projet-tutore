<?php

namespace apiDB\core\dto\user;

use apiDB\core\dto\DTO;
use DateTime;
use Ramsey\Uuid\Uuid;

class UserDTO extends DTO
{
    private Uuid $id;
    private string $name;
    private string $surname;
    private string $email;
    private string $password;
    private DateTime $dateInscription;
}