<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Task;
use App\Repositories\TaskRepository;

class TaskController extends Controller
{
    /**
     * The task repository instance.
     *
     * @var TaskRepository
     */
    protected $tasks;

    /**
     * Create a new controller instance.
     *
     * @param  TaskRepository  $tasks
     * @return void
     */
    public function __construct(TaskRepository $tasks)
    {
        $this->middleware('auth');

        $this->tasks = $tasks;
    }

    /**
     * Display a list of all of the user's task.
     *
     * @param  Request  $request
     * @return Response
     */
    public function index(Request $request)
    {
        $userTasks = $this->tasks->forUser($request->user());
        return view('tasks.index', [
            'tasks' => $this->tasks->forUser($request->user()),
        ]);
        //return response()->json($userTasks);
    }

    /**
     * Create a new task.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
        ]);

        $request->user()->tasks()->create([
            'name' => $request->name,
        ]);

        return redirect('/tasks');
    }

    /**
     * Destroy the given task.
     *
     * @param  Request  $request
     * @param  Task  $task
     * @return Response
     */
    public function destroy(Request $request, Task $task)
    {
        $this->authorize('destroy', $task);

        $task->delete();

        return redirect('/tasks');
    }

    /**
     * ユーザのタスク一覧をJSON形式で返します。
     *
     * @return JSON Object
     */
    public function getTasks(Request $request)
    {
        $userTasks = $this->tasks->forUser($request->user());
        return response()->json($userTasks);
    }

    public function addTask(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
        ]);
        $addedTask = $request->user()->tasks()->create([
            'name' => $request->name,
        ]);
        return response()->json($addedTask);
    }

    public function deleteTask(Request $request, Task $task)
    {
        $this->authorize('destroy', $task);
        $isDeleted = $task->delete();
        return response()->json($isDeleted);
    }
}
