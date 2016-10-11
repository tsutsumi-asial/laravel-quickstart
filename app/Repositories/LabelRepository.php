<?php

namespace App\Repositories;

use App\Label;
use App\User;

class LabelRepository
{
    public function forUser(User $user)
    {
        return Label::where('user_id', $user->id)
            ->orderBy('id', 'desc')
            ->get();
    }
}