import { useState } from 'react'
import "./App.css"
import Todo from "./components/todo"
import TodoForm from "./components/todoForm"
import Search from './components/Search'
import Filter from './components/Filter'

function App() {

  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todo')) || [
    {
      id: 0,
      text: "Estudar Bootstrap",
      category: "CT",
      isCompleted: false,
    },
    {
      id: 1,
      text: "Estudar C#",
      category: "CT",
      isCompleted: false,
    },
  ])

  console.log(todos)

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sort, setSort] = useState("Asc")

  const setBD = (newTodos) => {
    localStorage.setItem('todo', JSON.stringify(newTodos))
  }

  const addTodo = (text, category) => {
    let id = todos.length == 0 ? 0 : todos[todos.length - 1].id + 1
    const newTodos = todos
    newTodos.push(
      {
        id: id,
        text,
        category,
        isCompleted: false,
      }
    )
    setTodos([...newTodos])
    setBD(newTodos)
  }

  const removeTodo = (todo) => {
    let i = todos.indexOf(todo)
    let newTodo = [...todos]
    newTodo.splice(i, 1)
    setTodos(newTodo)
    setBD(newTodo)
  }

  const completeTodo = (id) => {
    const newTodo = [...todos]
    newTodo.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo)
    setTodos(newTodo)
    setBD(newTodo)
  }

  return (
    <div className='app'>
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}  />
      <div className='todo-list'>
        {todos
          .filter((todo) =>
            filter === "all" ? true : filter === "completed" ? todo.isCompleted : !todo.isCompleted)
          .filter((todo) =>
            categoryFilter === "all" ? true : todo.category.includes(categoryFilter))
          .filter((todo) =>
            todo.text.toLowerCase().includes(search.toLowerCase()) || todo.category.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) => sort === "Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text))
          .map((todo) => (
            <Todo key={todo.id} todo={todo} removeTodo={removeTodo} completeTodo={completeTodo} />
          ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  )
}

export default App
