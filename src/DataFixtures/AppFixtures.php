<?php

namespace App\DataFixtures;

use App\Factory\RecipeFactory;
use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        UserFactory::createOne([
            'email' => 'test@test.com',
            'username' => 'John12',
            'password' => '123',
        ]);

        UserFactory::createMany(10);
        RecipeFactory::createMany(25, function () {
            return [
                'owner' => UserFactory::random(),
            ];
        });

        $manager->flush();
    }
}
