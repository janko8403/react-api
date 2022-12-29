<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'firstName' => 'Test User',
            'lastName' => 'Test User',
            'email' => 'test@example.com',
            'phoneNumber' => '123456789',
            'avatar' => 'ffreewrewfcerewr',
        ]);
    }
}
