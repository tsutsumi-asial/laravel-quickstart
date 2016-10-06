<?php

use App\User;
use App\Task;
use Illuminate\Database\Seeder;

class TasksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = DB::table('users')->get();
        foreach($users as $user) {
            factory(Task::class, 100)->create([
                'user_id' => $user->id
            ]);
        }
    }
}
