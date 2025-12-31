<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use RefreshDatabase;

    public function user_can_register_and_receive_token()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Shaima',
            'email' => 'shaima@test.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response
            ->assertStatus(201)
            ->assertJsonStructure([
                'user',
                'token',
            ]);
    }
}
