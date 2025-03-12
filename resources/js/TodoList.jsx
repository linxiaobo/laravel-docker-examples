import { useState } from 'react';

const Task = (props) => {
    return (
        <>
            <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600" style={{backgroundColor: props.task.completed ? "green" : ""}}>
                {props.task.name}
                <button type={"button"} className={"text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"} onClick={() => {props.removeTask(props.task)}}>remove</button>
                <button type={"button"} className={"text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"} onClick={() => {props.completeTask(props.task)}}>complete</button>
            </li>
        </>
    );
}

export default function TodoList() {
    const [todoList, setTodoList] = useState([]);
    const [newTask, setNewTask] = useState("");

    const toggleNewTask = (event) => {
        setNewTask(event.target.value);
    }

    const addNewTask = (taskName) => {
        if (taskName === '') {
            return false;
        }

        const task = {
            id: todoList.length + 1,
            name: taskName,
            completed: false
        }
        setTodoList([...todoList, task]);
        setNewTask("");
    }

    const completeTask = (task) => {
        const newTodoList = todoList.map((todoItem) => {
            if (task.id === todoItem.id) {
                todoItem.completed = true;
            }

            return todoItem;
        });

        setTodoList(newTodoList);
    }

    const removeTask = (task) => {
        const newTodoList = todoList.filter((todoItem) => {
            return task.id !== todoItem.id;
        });

        setTodoList(newTodoList);
    }

    return (
        <div className="container">
            <div className={"grid md:grid-cols-2"}>
                <input type={"text"} className={"block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} value={newTask} onChange={toggleNewTask} />
                <button type={"button"} className={"w-50 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"} onClick={() => {addNewTask(newTask)}}>Add Task</button>
                {todoList.length > 0 &&
                <ul className="w-200 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {todoList.map((task) => {
                        return (
                            <Task task={task} removeTask={() => removeTask(task)} completeTask={() => completeTask(task)}  />
                        );
                    })}
                </ul>
                }
            </div>
        </div>
    );
}
