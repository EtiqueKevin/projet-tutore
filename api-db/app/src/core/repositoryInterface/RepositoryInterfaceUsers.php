<?php

namespace apiDB\core\repositoryInterface;

use apiDB\core\domain\entities\user\User;

interface RepositoryInterfaceUsers{

    function getUsersById(string $id) : User;

}