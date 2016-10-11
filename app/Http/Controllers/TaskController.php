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
        return view('tasks.index');
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
        return $this->tasks->forUser($request->user(), 10);
    }

    public function getTasksWithLabels(Request $request)
    {
        return Task::where('user_id', $request->user()->id)
            ->with('labels')
            ->orderBy('id', 'desc')
            ->paginate(10);
        /*$data = [];
        Task::with('labels');
        foreach($tasks as $task) {
            //$labels = $task->labels()->get(array('id', 'name'));
            $task['labels'] = $task->labels()->get(array('id', 'name'));
            $data[] = $task;
            $labels = $task->pivot()->with();
            foreach($labels as $label) {
                $data[] = $label;
            }
        }
        return $data;
        /*$paginator = $this->tasks->forUser($request->user(), 10);
        $data = [];
        foreach($paginator->items() as $task) {
            $labels = [];
            foreach($task->labels() as $label) {
                $labels[] = $label;
            }
            $task['labels'] = $task->labels();
            $data[] = $task;
        }
        return response()->json($data);*/
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addTask(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
        ]);
        $user = $request->user();
        $task = $user->tasks()->create([
            'name' => $request->name,
        ]);
        $task->labels()->attach($request->labels);

        return $task
            ->with('labels')
            ->where('id', $task->id)
            ->first();
    }

    public function deleteTask(Request $request, Task $task)
    {
        $this->authorize('destroy', $task);
        $isDeleted = $task->delete();
        return response()->json($isDeleted);
    }

}
