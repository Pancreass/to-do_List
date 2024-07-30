import {useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';

function To_do_main() {
  const [ToDoText, setToDoText] = useState('')
  const [TodoList, setTodoList] = useState([])
  const [ShowfinishedTodo, setShowfinishedTodo] = useState(true)

  useEffect(() => {
    let TodoString = localStorage.getItem("TodoList")
    if (TodoString) {
      let newTodoList = JSON.parse(localStorage.getItem("TodoList"))
      setTodoList(newTodoList)
    }
  }, [])
  

  const saveToLS=() => {
    localStorage.setItem("TodoList",JSON.stringify(TodoList));
  }
  
  const HandleDelete=(event,id)=>{
    let newTodoList= TodoList.filter(item=>{
      return item.id!==id
    });
    setTodoList(newTodoList)
    saveToLS();
  }

  const HandleEdit=(event,id)=>{
    let newTodoList= TodoList.filter(item=>{
      return item.id===id
    });
    setToDoText(newTodoList[0].ToDoText);
    let newTodoList2= TodoList.filter(item=>{
      return item.id!==id
    });
    setTodoList(newTodoList2)
    saveToLS();
  }

  const handleOnChange =(event)=>{
    setToDoText(event.target.value)
  }

  const HandleAdd=()=>{
    setTodoList([...TodoList ,{id:uuidv4() , ToDoText, iscomplete:false}])
    setToDoText('')
    saveToLS();
    console.log(TodoList)
  }


  const handleCheckbox=(event,id)=>{
    let index= TodoList.findIndex(item=>{
      return item.id===id}
    )
    let newTodoList= [...TodoList];
    newTodoList[index].iscomplete = !newTodoList[index].iscomplete;
    setTodoList(newTodoList);
    saveToLS();
  }

  const toggleFinished=()=>{
    setShowfinishedTodo(!ShowfinishedTodo)
  }

  return (
    <div className='mx-10 my-16 px-24 py-5 min-h-[80vh] rounded-xl bg-slate-500'>
      <h1 className="text-center mb-3 text-2xl font-bold center">Add a To-Do</h1>
      <div className=" justify-center flex space-x-6">
        <input onChange={handleOnChange} value={ToDoText} className="w-[40vw] py-1 px-3 rounded-lg" type="text" name="todoInput" id="" />
        <button onClick={HandleAdd} disabled={ToDoText.length<=3} className="btn py-1 px-2 bg-blue-800  text-white rounded-lg text-sm  hover:bg-blue-900 hover:text-base">add</button>
      </div>
      <input type="checkbox" onChange={toggleFinished} checked={ShowfinishedTodo} name="finishedTodoToggle" id="" />show finished ToDo`s
      <h2 className="text-center mt-9 mb-3 text-2xl font-bold">Your To-Do`s</h2>


      {TodoList.length===0 && <div className='my-12 text-center font-semibold text-xl'>**No To-Do`s Here.  Add now** </div>}
      {TodoList.map(item=>{ 
      return (ShowfinishedTodo || !item.iscomplete) && <div key={item.id} className="flex items-center px-2 py-1 my-2 border-b-[0.5px] border-slate-400 w-11/12">
        <div className="flex space-x-1  w-3/4">
          <input className='mr-2' onChange={(event)=>handleCheckbox(event,item.id)} type="checkbox" checked={item.iscomplete} name="" id={item.id} />
          <h3 className={`${item.iscomplete?'line-through':''}  `}>{item.ToDoText} </h3>
        </div>
        <div className="buttons  items-center space-x-4   ">
          <button onClick={(event)=>HandleEdit(event,item.id)} id={item.id} className="btn py-1 px-2 bg-blue-800  text-white rounded-lg  text-sm  hover:bg-blue-900 hover:text-base">edit</button>
          <button onClick={(event)=>HandleDelete(event,item.id)} id={item.id} className="btn py-1 px-2 bg-blue-800  text-white rounded-lg  text-sm  hover:bg-blue-900 hover:text-base">delete</button>
        </div>
      </div>
    })}

    </div>
  )
}

export default To_do_main
