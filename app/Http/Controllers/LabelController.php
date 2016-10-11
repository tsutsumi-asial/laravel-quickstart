<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Label;
use App\Repositories\LabelRepository;

class LabelController extends Controller
{

    protected $labels;

    public function __construct(LabelRepository $labels)
    {
        $this->middleware('auth');
        $this->labels = $labels;
    }

    public function addLabel(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
        ]);
        $addedLabel = $request->user()->labels()->create([
            'name' => $request->name,
        ]);
        return response()->json($addedLabel);
    }

    public function deleteLabel(Request $request, Label $label)
    {
        $this->authorize('destroy', $label);
        $isDeleted = $label->delete();
        return response()->json($isDeleted);
    }

    public function getLabels(Request $request)
    {
        $userLabels = $this->labels->forUser($request->user());
        return response()->json($userLabels);
    }

    public function getLabelsWithTasks(Request $request)
    {
        return Label::where('user_id', $request->user()->id)
            ->with('tasks')
            ->get();
    }

}
