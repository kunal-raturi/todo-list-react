import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

const LOCAL_STORAGE_KEY = "tasks";

function App() {
  const [tasks, setTasks] = useState(() => {
    const retriveTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveTasks) {
      return retriveTasks;
    }
    return [];
  });
  const [taskInput, setTaskInput] = useState("");

  function AddHandler() {
    if (taskInput.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: uuid(), content: taskInput, isChecked: false },
      ]);
      setTaskInput("");
    }
  }

  function DeleteHandler(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  function checkBoxCheck(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: !task.isChecked };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const renderList = tasks.map((task) => (
    <div key={task.id} className="task">
      <input
        type="checkbox"
        checked={task.isChecked}
        onChange={() => checkBoxCheck(task.id)}
      />
      <ol>
        <li
          style={{ textDecoration: task.isChecked ? "line-through" : "none" }}
        >
          {task.content}
        </li>
      </ol>
      <button onClick={() => DeleteHandler(task.id)}>delete</button>
    </div>
  ));

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="TodoList">
      <div>
        <h1>TODO LIST</h1>
      </div>
      <div className="task-input">
        <input
          type="text"
          placeholder="enter your task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={AddHandler}>Add</button>
      </div>
      <div>{renderList}</div>
    </div>
  );
}

export default App;
