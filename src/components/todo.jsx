import React from 'react'

const todo = ({ todo, removeTodo, completeTodo }) => {
    return (        
        <div className='todo' style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
            <div className='content'>
                <p>{todo.text}</p>
                <p>({todo.category}) </p>
            </div>
            <div>
                <button className='complete' onClick={() => completeTodo(todo.id)}>Ok</button>
                <button className='remove' onClick={() => removeTodo(todo)}>X</button>
            </div>
        </div>
    )
}

export default todo