import { useState } from 'react'

const todoForm = ({ addTodo, telaCadastro, setTelaCadastro, listaCategorias }) => {
    const [value, setValue] = useState("")
    const [category, setCategory] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!value || !category)
            return

        addTodo(value, category)

        setCategory("")
        setValue("")
        setTelaCadastro(false)
    }

    return (
        <div className='modal-cadastro' style={{ display: telaCadastro === true ? "block" : "none" }}>
            <div className='cadastro'>
                <div className='app'>
                    <div className='todo-form'>
                        <h2>Criar tarefa:</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" value={value} placeholder='Digite o título' onChange={(e) => (setValue(e.target.value))} />
                            <select value={category} onChange={(e) => (setCategory(e.target.value))}>
                                <option value="">Selecione uma categoria</option>
                                {listaCategorias.map((cat) => <option value={cat.nome} key={cat.id}>{cat.nome}</option>)}
                            </select>

                            <div className='center'>
                                <button type='submit'>Criar tarefa</button>
                                <button onClick={() => setTelaCadastro(false)}>Fechar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default todoForm