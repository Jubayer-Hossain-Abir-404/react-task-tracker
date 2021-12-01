import React from "react";
import { useState, useEffect } from 'react'
//import { BrowserRouter as Router, Route } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"

import About from "./components/About";
//import { render } from "@testing-library/react";
//import { Router, Routes } from "react-router";
//import {  Switch } from "react-router";


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

  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    //console.log(data)
    return data
  }

// Add task
const addTask = async (task) => {
  //console.log(task);
  // const id = Math.floor(Math.random() * 10000) +1 
  // //console.log(id)
  // const newTask = {id, ...task}
  // setTasks([...tasks, newTask])

  const res = await fetch('http://localhost:5000/tasks',{
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(task),
  })

  const data = await res.json()

  setTasks([...tasks, data])
}

// Delete Task
const deleteTask = async (id) => {
  //console.log('delete', id)

  await fetch(`http://localhost:5000/tasks/${id}`,{
    method: 'DELETE'
  })

  setTasks(tasks.filter((task) => task.id !== id))
}

//Toggle Reminder
const toggleReminder =async (id) =>{
  //console.log(id)
  const taskToToggle = await fetchTask(id)
  const updTask = {...taskToToggle, reminder: !taskToToggle.reminder }

  const res = await fetch(`http://localhost:5000/tasks/${id}`,{
    method: 'PUT',
    headers:{
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
  })

  const data = await res.json()

  setTasks(
    tasks.map((task) => 
    task.id ===id? {...task, reminder: 
      data.reminder} : task
    )
  )
}
  return (
   
    <BrowserRouter>
      
    <div className='container'>
      <Header onAdd={() => setShowAddtask(!showAddTask)} 
      showAdd={showAddTask}/>
      {/* {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete=
      {deleteTask} onToggle={toggleReminder}/> : (
        'No tasks To Show'
        )} */}
        
        <Routes>
          {/* <Route path='/about' component={withRouter(About)} /> */}
          {/* <Route path='/' exact render={(props) => (
            <>
                {showAddTask && <AddTask onAdd={addTask}/>}
                {tasks.length > 0 ? <Tasks tasks={tasks} onDelete=
                {deleteTask} onToggle={toggleReminder}/> : (
                  'No tasks To Show'
                  )}
            </>
          )} /> */}
          <Route  path="/" element={
            <>
            {showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete=
            {deleteTask} onToggle={toggleReminder}/> : (
              'No tasks To Show'
              )}
            </>
          }/>
          <Route  path="/about" element={<About/>}/>
        </Routes>
        
        <Footer />
    </div>
    
    </BrowserRouter>
    
  )
     
} 

// class App extends React.Component{
//   render(){
//     return <h1>Hello from a class</h1>
//   }
// }
export default App;
