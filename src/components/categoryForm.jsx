import { useState } from "react"
import Categoria from "./category"

const categoryForm = ({ telaCategoria, setTelaCategoria, listaCategorias, setListaCategorias, setBD }) => {

  const [categoria, setCategoria] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!categoria) return

    const newLista = listaCategorias
    newLista.push(
      {
        id: listaCategorias.length == 0 ? 0 : listaCategorias[listaCategorias.length - 1].id + 1,
        nome: categoria,
      }
    )
    setListaCategorias([...newLista])
    setCategoria("")
    setBD(null, newLista)
    setTelaCategoria(false)
  }

  const remove = (cat) => {
    let i = listaCategorias.indexOf(cat)
    let newLista = [...listaCategorias]
    newLista.splice(i, 1)
    setListaCategorias(newLista)
    setBD(null, newLista)
  }

  return (
    <div className='modal-cadastro' style={{ display: telaCategoria === true ? "block" : "none" }}>
      <div className='cadastro'>
        <div className='app'>
          <div className='todo-form'>
            <h2>Criar categoria:</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" value={categoria} placeholder='Digite a categoria' onChange={(e) => (setCategoria(e.target.value))} />
              <div className='center div-botoes'>
                <button type='submit'>Criar categoria</button>
                <button onClick={() => setTelaCategoria(false)}>Fechar</button>
              </div>
            </form>
            <div>
              {
                listaCategorias.map((cat) => (
                  <Categoria key={cat.id} cat={cat} remove={remove} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default categoryForm