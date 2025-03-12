import React from "react";

function TaskList( {todoList, removeTask, completeTask} ) {
    return (
        <div className='todo-list-container'>
            <ul className="todo-list w-200 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {todoList.map((task) => {
                    return (
                        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600" style={{backgroundColor: task.completed ? "green" : ""}}>
                            {task.name}
                            <button type={"button"} className={"text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"} onClick={() => {removeTask(task)}}>remove</button>
                            <button type={"button"} className={"text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"} onClick={() => {completeTask(task)}}>complete</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
};

export default TaskList;
