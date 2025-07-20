import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts/TodoContext'
import { TodoForm, TodoItem } from './components/index.js'

function App() {
  const [todos, setTodos] = useState([])

  // ✅ Add a todo
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  // ✅ Update a todo by ID
  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    )
  }

  // ✅ Delete a todo by ID
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  // Toggle completed state
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    )
  }

  //  Load todos from localStorage on first render
  useEffect(() => {
    const todosFromStorage = JSON.parse(localStorage.getItem('todos'))
    if (todosFromStorage && todosFromStorage.length > 0) {
      setTodos(todosFromStorage)
    }
  }, [])

  //  Save todos to localStorage on change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="max-w-2xl mx-auto p-4">
        <TodoForm />

        <div className="flex flex-col gap-3 mt-6">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
