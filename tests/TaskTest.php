<?php

use App\User;
use App\Task;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TaskTest extends TestCase
{

    /** テスト後にDatabaseをリセット */
    use DatabaseTransactions;

    /**
     * ユーザのタスクをとってこれるかのテスト
     */
    public function testGetTaskList()
    {
        $user1 = factory(User::class)->create();
        $user2 = factory(User::class)->create();
        $user1->tasks()->save($task1 = factory(Task::class)->create());
        $user2->tasks()->save($task2 = factory(Task::class)->create());
        $this->actingAs($user1)
            ->get('/api/tasks')
            ->assertJson(json_encode($task1)); // 成功
        $this->actingAs($user2)
            ->get('/api/tasks')
            ->assertJson(json_encode($task2)); // 成功
    }

    /**
     * ユーザがタスクを追加できるかどうかのテスト
     */
    public function testUserCanAddNewTask()
    {
        $user = factory(User::class)->create();
        $task = [ 'name' => str_random(10) ];
        $this->actingAs($user)->post('/api/tasks', $task)->seeJsonContains($task);
    }

    public function testUserCanDeleteTask()
    {
        $user1 = factory(User::class)->create();
        $user2 = factory(User::class)->create();
        $user1->tasks()->save($task1 = factory(Task::class)->create());
        $user2->tasks()->save($task2 = factory(Task::class)->create());
        // user2がtask1の削除　→　失敗
        $this->actingAs($user2)
            ->delete('/api/tasks/'.$task1->id)
            ->assertResponseStatus(403);
        // user1がtask2の削除　→　失敗
        $this->actingAs($user1)
            ->delete('/api/tasks/'.$task2->id)
            ->assertResponseStatus(403);
        // user1がtask1の削除　→　成功
        $this->actingAs($user1)
            ->delete('/api/tasks/'.$task1->id)
            ->assertResponseOk();
        // user2がtask2の削除　→　成功
        $this->actingAs($user2)
            ->delete('/api/tasks/'.$task2->id)
            ->assertResponseOk();
    }
}
