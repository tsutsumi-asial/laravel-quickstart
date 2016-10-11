<?php

namespace App\Repositories;

use App\User;
use App\Task;

class TaskRepository
{
    /**
     * Get the specified number of the tasks for a given user.
     *
     * @param  User  $user
     * @return Collection
     */
    public function forUser(User $user, $perPage)
    {
        return Task::where('user_id', $user->id)
                    ->orderBy('id', 'desc')
                    //->get();
                    ->paginate($perPage);
    }

}
