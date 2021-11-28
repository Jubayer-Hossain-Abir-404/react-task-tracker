import React from "react";
import Header from "./components/Header"
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

import { useState, useEffect } from "react"
const App = () => {
  const[showAddTask, setShowAddtask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect( () => {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    //console.log(data)
    return data
  }

// Add task
const addTask = (task) => {
  //console.log(task);
  const id = Math.floor(Math.random() * 10000) +1 
  //console.log(id)
  const newTask = {id, ...task}
  setTasks([...tasks, newTask])
}

// Delete Task
const deleteTask = (id) => {
  //console.log('delete', id)
  setTasks(tasks.filter((task) => task.id !== id))
}

//Toggle Reminder
const toggleReminder =(id) =>{
  //console.log(id)
  setTasks(tasks.map((task) => task.id ===id? {...task, reminder: 
    !task.reminder} : task
    )
  )
}
  return (
    <div className='container'>
      <Header onAdd={() => setShowAddtask(!showAddTask)} 
      showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete=
      {deleteTask} onToggle={toggleReminder}/> : (
        'No tasks To Show'
        )}
    </div>
  )
} 

// class App extends React.Component{
//   render(){
//     return <h1>Hello from a class</h1>
//   }
// }
export default App;
