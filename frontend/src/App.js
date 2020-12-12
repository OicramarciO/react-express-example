import './App.css';
import React, { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [changes, setChanges] = useState(true)
  const [input, setInput] = useState('')

  useEffect(() => {
    if(changes) {
     fetch('http://localhost:3030/todos')
      .then(response => response.json())
      .then(( data ) => {
        setTodos(data);
      });

      setChanges(false)
    }
     
  }, [changes]);

  // Order of complecity
  // get - post - delete - update

  console.log('todos :: ', todos)

  const updateTodo = (id, completed) => {
    const putMethod = {
      method: 'PUT', // Method itself
      headers: {
       'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
      },
      body: JSON.stringify({
        completed: !completed
      }) // We send data in JSON format
     }

    fetch(`http://localhost:3030/todo/${id}`, putMethod)
      .then(response => response.json())
      .then(( data ) => {
        if (data) {
          console.log('Item has been updated')
          setChanges(true)
        }else {
          console.log('Item has not been updated')
        }
      });
  }

  const deleteTodo = (id) => {
    const deleteMethod = {
      method: 'DELETE',
      headers: {
       'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
      },
     }

    fetch(`http://localhost:3030/todo/${id}`, deleteMethod)
      .then(response => response.json())
      .then(( data ) => {
        if (data) {
          console.log('Item has been deleted')
          setChanges(true)
        }else {
          console.log('Item has not been deleted')
        }
      });
  }

  const createTodo = (description) => {
    const postMethod = {
      method: 'POST',
      headers: {
       'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
      },
      body: JSON.stringify({
        description: description
      })
     }

    fetch(`http://localhost:3030/todo`, postMethod)
      .then(response => response.json())
      .then(( data ) => {
        if (data) {
          console.log('Item has been created')
          setChanges(true)
        }else {
          console.log('Item has not been created')
        }
      });
  }

  return (
    <div>
      <p>description: </p>
      <input name="new-todo" value={input} onChange={(e) => setInput(e.target.value)}/>
      <button  onClick={() => createTodo(input)}>Create Item</button>
      <ul>
      {todos.map((todo) => 
        <li >{
          todo.description} ::
          completed: {todo.completed ? 'YES': 'NO'}
        <button  onClick={() => updateTodo(todo.id, todo.completed)}>Toggle Complete</button>
        <button  onClick={() => deleteTodo(todo.id)}>Delete Item</button>
        </li>)}
      </ul>
    </div>
  );
}

export default App;
