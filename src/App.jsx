import { useState } from 'react'
import "./App.css"
import Todo from "./components/todo"
import TodoForm from "./components/todoForm"
import CategoryForm from './components/categoryForm'
import Search from './components/Search'
import Filter from './components/Filter'
import logo from './img/logo.svg'

function App() {

  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || [
    {
      id: 0,
      text: "Estudar Prova",
      category: "CT",
      isCompleted: false,
    },
    {
      id: 1,
      text: "Pagar conta de energia",
      category: "Pessoal",
      isCompleted: false,
    },
  ])

  const [listaCategorias, setListaCategorias] = useState(JSON.parse(localStorage.getItem('categories')) || [
    {
      id: 1,
      nome: "CT",
    }, 
    {
      id: 2,
      nome: "Pessoal",
    }]
  )

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sort, setSort] = useState("Asc")
  const [telaCadastro, setTelaCadastro] = useState(false)
  const [telaCategoria, setTelaCategoria] = useState(false)
  const [telaSearch, setTelaSearch] = useState(false)

  const setBD = (nTodos, nCategorias) => {
    localStorage.setItem('todos', JSON.stringify(nTodos === null ? todos : nTodos))
    localStorage.setItem('categories', JSON.stringify(nCategorias === null ? listaCategorias : nCategorias))
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
    setBD(newTodos, null)
  }

  const removeTodo = (todo) => {
    let i = todos.indexOf(todo)
    let newTodo = [...todos]
    newTodo.splice(i, 1)
    setTodos(newTodo)
    setBD(newTodo, null)
  }

  const completeTodo = (id) => {
    const newTodo = [...todos]
    newTodo.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo)
    setTodos(newTodo)
    setBD(newTodo, null)
  }

  return (
    <div className='app'>
      <h1><img src={logo} className='logo' /> Lista de Tarefas</h1>
      <div className='center div-botoes'>
        <button onClick={() => setTelaCadastro(!telaCadastro)}>Nova Tarefa</button>
        <button onClick={() => setTelaCategoria(!telaCategoria)}>Nova Categoria</button>
        <button onClick={() => setTelaSearch(!telaSearch)}>Pesquisar / Filtrar</button>
      </div>
      <div style={{ display: telaSearch === true ? "block" : "none" }}>
        <Search search={search} setSearch={setSearch} />
        <Filter filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} listaCategorias={listaCategorias}/>
      </div>
      <div className='todo-list'>
        {
          todos
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
      <TodoForm addTodo={addTodo} telaCadastro={telaCadastro} setTelaCadastro={setTelaCadastro} listaCategorias={listaCategorias} />
      <CategoryForm telaCategoria={telaCategoria} setTelaCategoria={setTelaCategoria} listaCategorias={listaCategorias} setListaCategorias={setListaCategorias} setBD={setBD} />
    </div>
  )
}

export default App
