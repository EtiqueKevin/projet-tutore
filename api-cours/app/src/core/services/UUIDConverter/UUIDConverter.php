<?php

namespace apiCours\core\services\UUIDConverter;

use MongoDB\BSON\Binary;
use Ramsey\Uuid\Uuid;

class UUIDConverter
{
    static public function toUUID(string $uuidString): Binary {
        return new Binary(Uuid::fromString($uuidString)->getBytes(), Binary::TYPE_UUID);
    }

    static public function fromUUID(Binary $binaryUuid): string {
        return Uuid::fromBytes($binaryUuid->getData())->toString();
    }
}