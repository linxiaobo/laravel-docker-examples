<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // 显示所有任务
    public function index()
    {
        return Task::all();
    }


    // 存储新任务
    public function store(Request $request)
    {
        // 验证输入
        $request->validate([
            'title' => 'required|max:255',
        ]);

        // 创建任务
        $task = Task::create([
            'title' => $request->title,
            'completed' => false,
        ]);

        return response()->json($task, 201);
    }

    // 显示单个任务
    public function show(Task $task)
    {
        return view('tasks.show', compact('task'));
    }

    // 更新任务
    public function update(Request $request, Task $task)
    {
        // 验证输入
        $request->validate([
            'title' => 'required|max:255',
            'completed' => 'boolean',
        ]);

        // 更新任务
        $task->update([
            'title' => $request->title,
            'completed' => $request->completed ?? false,
        ]);

        return $task;
    }

    // 删除任务
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(null, 204);
    }
}
