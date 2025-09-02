import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts/TodoContext'
import { TodoForm, TodoItem } from './components'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    )
  }

  useEffect(() => {
    const todosFromStorage = JSON.parse(localStorage.getItem('todos'))
    if (todosFromStorage?.length) setTodos(todosFromStorage)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          My Todo List
        </h1>

        <div className="bg-white rounded-lg shadow p-4">
          <TodoForm />

          <div className="flex flex-col gap-3 mt-6">
            {todos.length > 0 ? (
              todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            ) : (
              <p className="text-center text-gray-500">No todos yet</p>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
