import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [done, setDone] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const navigate = useNavigate();

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${SERVER_URL}/todo`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data);
    } catch (error) {
      alert("Error fetching todos");
    }
  };

  const addTodo = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${SERVER_URL}/todo`,
        { title, description, done },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setDescription("");
      setDone(false);
      fetchTodos();
    } catch (error) {
      alert("Error adding todo");
    }
  };

  const updateTodo = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${SERVER_URL}/todo/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setEditingTodo(null);
      fetchTodos();
    } catch (error) {
      alert("Error updating todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${SERVER_URL}/todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
    } catch (error) {
      alert("Error deleting todo");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-container">
      <div className="header">
        <h2>Todo List</h2>
        <button className="signout-btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>

      <div className="todo-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          value={done}
          onChange={(e) => setDone(e.target.value === "true")}
        >
          <option value="false">Pending</option>
          <option value="true">Completed</option>
        </select>
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editingTodo === todo.id ? (
              <>
                <input
                  type="text"
                  value={todo.title}
                  onChange={(e) =>
                    setTodos(
                      todos.map((t) =>
                        t.id === todo.id ? { ...t, title: e.target.value } : t
                      )
                    )
                  }
                />
                <input
                  type="text"
                  value={todo.description}
                  onChange={(e) =>
                    setTodos(
                      todos.map((t) =>
                        t.id === todo.id
                          ? { ...t, description: e.target.value }
                          : t
                      )
                    )
                  }
                />
                <select
                  value={todo.done ? "true" : "false"}
                  onChange={(e) => {
                    const updatedDone = e.target.value === "true";
                    setTodos(
                      todos.map((t) =>
                        t.id === todo.id ? { ...t, done: updatedDone } : t
                      )
                    );
                  }}
                >
                  <option value="false">Pending</option>
                  <option value="true">Completed</option>
                </select>
                <button onClick={() => updateTodo(todo.id, todo)}>Save</button>
              </>
            ) : (
              <>
                <span className={`todo-title ${todo.done ? "completed" : ""}`}>
                  {todo.title} - {todo.description}
                </span>
                <span
                  className={`todo-status ${
                    todo.done ? "completed" : "pending"
                  }`}
                >
                  {todo.done ? "Completed" : "Pending"}
                </span>
                <button
                  className="edit-btn"
                  onClick={() => setEditingTodo(todo.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;