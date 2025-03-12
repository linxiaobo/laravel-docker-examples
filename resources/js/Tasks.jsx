import './bootstrap';
import React, { useState, useEffect } from 'react';

export const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    // 获取任务列表
    const fetchTasks = async () => {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setTasks(data);
    };

    // 添加新任务
    const addTask = async () => {
        await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTask, completed: false }),
        });
        setNewTask('');
        fetchTasks();
    };

    // 更新任务状态
    const toggleTask = async (id) => {
        const task = tasks.find((task) => task.id === id);
        await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !task.completed }),
        });
        fetchTasks();
    };

    // 删除任务
    const deleteTask = async (id) => {
        await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
        fetchTasks();
    };

    // 初始化时获取任务
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Task List</h1>
            <div>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span
                            style={{
                                textDecoration: task.completed ? 'line-through' : 'none',
                            }}
                            onClick={() => toggleTask(task.id)}
                        >
                            {task.title}
                        </span>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;
