<?php

namespace apiGestion\core\dto\user;

use apiGestion\core\dto\DTO;
use DateTime;
use Ramsey\Uuid\Uuid;

class UserDTO extends DTO
{
    private string $id;
    private string $name;
    private string $surname;
    private int $role;
    private string $linkpic;
    private string $email;
    private DateTime $dateSignin;
    private DateTime $dateSignup;

    public function __construct(string $id, string $name, string $surname, int $role, string $linkpic, string $email, DateTime $dateSignin, DateTime $dateSignup)
    {
        $this->id = $id;
        $this->name = $name;
        $this->surname = $surname;
        $this->role = $role;
        $this->linkpic = $linkpic;
        $this->email = $email;
        $this->dateSignin = $dateSignin;
        $this->dateSignup = $dateSignup;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'surname' => $this->surname,
            'role' => $this->role,
            'linkpic' => $this->linkpic,
            'email' => $this->email,
            'dateSignin' => $this->dateSignin->format('Y-m-d H:i:s'),
            'dateSignup' => $this->dateSignup->format('Y-m-d H:i:s')
        ];
    }
}