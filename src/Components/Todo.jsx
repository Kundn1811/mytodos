import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Todo = () => {
 const [todos, setTodos] = useState([]);
 const [text,setText] = useState("");
 const [page,setPage] = useState(1);

 const setInfo=()=>{
   console.log("called")
     fetch("http://localhost:3004/todos",{
         method: 'POST',
         headers:{

           'content-type':"application/json"
          },
         body:JSON.stringify({
             text: text,
             done: false,
             count: 10
         })
     }).then(r=>r.json())
     setText("")
 }
 
const onDelete= async (id)=>{
  try{

    await axios.delete(`http://localhost:3004/todos/${id}`)
    alert("item deleted")

  }catch(err){
    alert(err)
  }
}

 useEffect(() => {
   fetch(`http://localhost:3004/todos?_page=${page}&_limit=5`).then(r=>r.json().then(d=> {
     //console.log(d)
       setTodos(d)
    }))
 
 },[page,todos])
 
 

  return (
    <div>
      <h1>Todo</h1>
         <div>
           <input type="text" onChange={(e)=>{
             setText(e.target.value)
           }} value={text} />
           <button onClick={()=>{setInfo()}}>Save</button>
         </div>
         <div className='list'>
           <ol>
             {todos.map((el,index)=>(
               <li key={el.id} className='item'>
                 <input type="checkbox" />
                 <p>{el.text}</p>
                 <button onClick={()=>{onDelete(el.id)}}>remove</button>
               </li>
             )
             )}
           </ol>
           <button disabled={page===1} onClick={()=>{setPage(page-1)}}>{`<`}</button>
           <button disabled={todos.length<5} onClick={()=>{setPage(page+1)}}>{`>`}</button>
          
         </div>
    </div>
  )
}

export default Todo