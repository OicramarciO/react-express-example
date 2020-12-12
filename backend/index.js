const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()

app.use(bodyParser.json());
app.use(cors())

const port = 3030

// CRUD = CREATE - READ - UPDATE - DELETE
//        POST   - GET  - PUT    - DELETE


// GET A LIST OF ALL TODO's
app.get('/todos', (req, res) => {
  fs.readFile("./todos.json", "utf-8", (err, data) => {
    if (err) { console.log(err) }
      console.log(data);
      res.send(data)
  })
})

// UPDATE INDIVIDUAL TODO ITEM TO COMPLETED OR NOT COMPLETED
app.put('/todo/:todo_id', (req, res) => {
  const {
    todo_id
  } = req.params

  const {
    completed
  } = req.body

  fs.readFile("./todos.json", "utf-8", (err, data) => {
    if (err) res.send(false)
      const todos = JSON.parse(data)

      const newTodosList = todos.map((todo) => {
        if (todo.id == todo_id) {
          return {
            ...todo,
            id: todo.id,
            completed: completed
          }
        }

        return todo
      })

      fs.writeFile('todos.json', JSON.stringify(newTodosList), (err) => {
        if (err) res.send(false);
        console.log('Data written to file');
      });
  })

  res.send(true)
})

// DELETE INDIVIDUAL TODO ITEM
app.delete('/todo/:todo_id', (req, res) => {
  const {
    todo_id
  } = req.params
  fs.readFile("./todos.json", "utf-8", (err, data) => {
    if (err) res.send(false)
      const todos = JSON.parse(data)

      const newTodosList = todos.filter((todo) => todo.id != todo_id)

      fs.writeFile('todos.json', JSON.stringify(newTodosList), (err) => {
        if (err) res.send(false);
        console.log('Data written to file');
      });
  })
  
  res.send(true)
})

// CREAT INDIVIDUAL TODO ITEM
app.post('/todo', (req, res) => {
  fs.readFile("./todos.json", "utf-8", (err, data) => {
    if (err) res.send(false)
      console.log(data);
      const todos = JSON.parse(data)
      
      const {
        description 
      } = req.body

      const tempTodo = {
        id: todos.length,
        description,
        completed: false
      }

      const newTodosList = [...todos, tempTodo]

      fs.writeFile('todos.json', JSON.stringify(newTodosList), (err) => {
        if (err) res.send(false);
        console.log('Data written to file');
      });
  })
  
  res.send(true)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})