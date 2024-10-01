<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Spatie\Permission\Models\Permission;

use App\Models\User;
use App\Models\UserMeta;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Permission::create(['name' => 'admin']);
        Permission::create(['name' => 'manage user']);

        $user = User::create([
            'first_name'=> 'Administrator',
            'email'     => 'admin@aims.local',
            'password'  => bcrypt(env('DEFAULT_PASSWORD','Amb0t7an9!')),
        ]);

        $user->email_verified_at = Carbon::now();
        $user->save();
        $user->createToken('administrator');
        $user->meta()->create([
            'meta_key' => 'bio',
            'meta_value' => 'This user is awesome',
        ]);
        $user->givePermissionTo('admin');

        $user = User::create([
            'first_name'=> 'Test',
            'last_name' => 'User',
            'email'     => 'test@aims.local',
            'password'  => bcrypt(env('DEFAULT_PASSWORD','Amb0t7an9!')),
        ]);

        $user->email_verified_at = Carbon::now();
        $user->save();
        $user->createToken('test-user');
    }
}
