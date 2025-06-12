<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{

    public function index(Request $request)
    {
        $query = Task::query();

        if ($request->has('sort')) {
            $query->orderBy('created_at', $request->sort);
        }

        if ($request->has('completed')) {
            $query->where('completed', $request->completed);
        }

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        return response()->json($query->paginate(5));
    }

    public function store(Request $request)
    {
        $task = Task::create($request->validate([
            'title'     => 'required|string|max:255',
            'description' => 'nullable|string',
        ]));

        return response()->json($task, 201);
    }

    public function update(Request $request, $task)
    {
        Task::findOrFail($task)->update($request->validate([
            'title'         => 'required|string|max:255',
            'description'   => 'nullable|string',
            'completed'     => 'nullable',
        ]));

        return response()->json(true);
    }

    public function destroy($task)
    {
        Task::findOrFail($task)->delete();
        return response()->json(null, 204);
    }

}
