//create a to-do application
import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, input]);
    setInput("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "40px",
      }}
    >
      <h1 style=
      {{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
        Simple To-Do App
      </h1>
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        <input
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "8px",
            fontSize: "1rem",
            width: "200px",
          }}
          type="text"
  value={input}
      onChange={e => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button
          style={{
            background: "#2563eb",
            color: "white",
         padding: "8px 16px",
            border: "none",
        borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <ul style={{ width: "320px", listStyle: "none", padding: 0 }}>
        {todos.map((todo, idx) => (
          <li
            key={idx}
            style={{
              background: "white",
              borderBottom: "1px solid #e5e7eb",
              padding: "12px 16px",
              fontSize: "1rem",
            }}
          >
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
