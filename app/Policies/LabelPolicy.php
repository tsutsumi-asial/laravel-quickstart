<?php

namespace App\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;

use App\User;
use App\Label;

class LabelPolicy
{
    use HandlesAuthorization;

    /**
     * ユーザがラベルを削除可能かどうかを決定します。
     *
     * @param User $user
     * @param Label $label
     * @return bool
     */
    public function destroy(User $user, Label $label)
    {
        return $user->id === $label->user_id;
    }
}
