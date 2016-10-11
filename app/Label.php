<?php

namespace App;

use App\Task;
use App\User;
use Illuminate\Database\Eloquent\Model;

class Label extends Model
{

    protected $fillable = ['name'];

    protected $hidden = ['pivot'];

    protected $casts = [
        'user_id' => 'int',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tasks()
    {
        return $this->belongsToMany(Task::class);
    }
}
