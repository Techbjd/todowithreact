import React, { useState } from 'react'
import {useTodo} from "../contexts/TodoContext"



function TodoForm() {
const [todo,setTodo]=useState("")
const {addTodo}=useTodo()
const add=(e)=>{e.preventDefault()
    if(!todo)return
    addTodo({todo,completed:false})

    setTodo("")
}
  return (
<form onSubmit={add} className="flex items-center gap-2 bg-white p-4 shadow-md rounded-xl">
  <input
  name='todoform'
    type="text"
    value={todo}
    onChange={(e) => setTodo(e.target.value)}
    placeholder="Write Todo ..."
    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  <button
    type="submit"
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
  >
    Add
  </button>
</form>

  )
}

export default TodoForm