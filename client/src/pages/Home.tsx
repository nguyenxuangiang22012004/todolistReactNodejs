import TaskForm from '../components/todolist/TaskForm.tsx'
import Todolist  from '../components/todolist/Todolist.tsx'

export default function Home() {
    return (
    <>
     <div className="flex flex-row bg-[rgb(152,193,217)] h-full w-full box-border min-h-screen items-start">
        <TaskForm />
        <Todolist />     
     </div> 
    </>
  )
}