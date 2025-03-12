import { useState } from 'react';

function TaskForm( {addNewTask} ) {
    const [newTask, setNewTask] = useState("");

    const handleAddTask = (newTask) => {
        if (!newTask.trim()) return;

        addNewTask(newTask);
        setNewTask("");
    }

    return (
        <>
            <input type={"text"} className={"block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} value={newTask} onChange={(event) => setNewTask(event.target.value)} />
            <button type={"button"} className={"w-50 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"} onClick={() => handleAddTask(newTask)}>Add Task</button>
        </>
    )
}

export default TaskForm;
