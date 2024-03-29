<?php

namespace App\Tests\Functional;

use App\Factory\UserFactory;

class UserResourceTest extends ApiTestCase
{

    public function testPostToCreateUser(): void
    {
        $this->client->jsonRequest('POST', '/api/users', [
            'email' => 'test@test.com',
            'username' => 'test_user',
            'password' => 'secret'
        ]);
        $this->assertResponseStatusCodeSame(201);

        $this->client->jsonRequest('POST', '/login', [
            'email' => 'test@test.com',
            'password' => 'secret'
        ]);

        $this->assertResponseIsSuccessful();
    }

    public function testPatchUser(): void
    {
        $user = UserFactory::createOne()->object();

        $this->client->loginUser($user);

        $this->client->jsonRequest('PATCH', '/api/users/' . $user->getId(), [
            'username' => 'changed',
        ], server: [
            'CONTENT_TYPE' => 'application/merge-patch+json',
        ]);

        $this->assertResponseIsSuccessful();
    }
}