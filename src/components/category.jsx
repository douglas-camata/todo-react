
const category = ({ cat, remove }) => {

  return (
    <div className='category '>
      <div className='content'>
        <p>{cat.nome}</p>
      </div>
      <div>
        <button className='remove' onClick={() => remove(cat)}>X</button>
      </div>
    </div>
  )
}

export default category