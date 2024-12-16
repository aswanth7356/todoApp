import './App.css'
import { useState } from 'react'
import { useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);



  const handleAdd = () => {

    if (editId) {
      setTodos(todos.map(todo => (todo.id === editId ? { ...todo, text: task } : todo)));
      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: task }]);
    }
    setTask("");
  };


  const handleEdit = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    console.log(todoToEdit)
    setTask(todoToEdit.text);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };


  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>To-Do App</h1>
        <div>
          <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter a task" style={{ padding: "10px", width: "200px" }} />
          <button onClick={handleAdd} style={{ padding: "10px", marginLeft: "10px" }}>
            {editId ? "Edit" : "Add"}
          </button>
        </div>
        <ul style={{ listStyleType: "none", padding: 0, marginTop: "20px" }}>
          {todos.map((todo) => (
            <li key={todo.id} style={{ margin: "10px 0" }}>
              <span>{todo.text}</span>
              <button onClick={() => handleEdit(todo.id)} style={{ marginLeft: "10px" }}>
                Edit
              </button>
              <button onClick={() => handleDelete(todo.id)} style={{ marginLeft: "10px" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
