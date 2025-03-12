import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export default function TodoList() {
    const [todoList, setTodoList] = useState([]);

    const addNewTask = (taskName) => {
        console.log(taskName);
        console.log(todoList.length + 1);
        const task = {
            id: todoList.length + 1,
            name: taskName,
            completed: false
        }
        setTodoList([...todoList, task]);
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
                <TaskForm addNewTask={addNewTask}  />
                {todoList.length > 0 &&
                    <TaskList todoList={todoList} removeTask={removeTask} completeTask={completeTask}/>
                }
            </div>
        </div>
    );
}
