const Filter = ({ filter, setFilter, sort, setSort, categoryFilter, setCategoryFilter, listaCategorias }) => {
    return (
        <div className="filter">
            <h2>Filtrar:</h2>
            <div className="filter-options">
                <div>
                    <p>Status:</p>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">Todos</option>
                        <option value="completed">Completas</option>
                        <option value="incompleted">Incompletas</option>
                    </select>
                </div>
                <div>
                    <p>Categoria:</p>
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} >
                        <option value="all">Todas</option>
                        {listaCategorias.map((cat) => <option value={cat.nome} key={cat.id}>{cat.nome}</option>)}
                    </select>
                </div>
                <div>
                    <p>Orderar</p>
                    <button onClick={() => setSort("Asc")}>Asc</button>
                    <button onClick={() => setSort("Desc")}>Desc</button>
                </div>
            </div>
        </div>
    )
}

export default Filter