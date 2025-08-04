import TaskForm from '../components/todolist/TaskForm.tsx'
import Todolist  from '../components/todolist/Todolist.tsx'
import { useEffect, useState } from "react";
import { getLists } from "../services/Todolist.ts";
import type { Todo } from '../components/todolist/Todolist';
export default function Home() {

  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchData = async () => {
    try {
      const response = await getLists();
      setTodos(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
    return (
    <>
     <div className="flex flex-row bg-[rgb(152,193,217)] h-full w-full box-border min-h-screen items-start">
        <TaskForm onAddSuccess={fetchData} />
        <Todolist todos={todos} setTodos={setTodos} />   
     </div> 
    </>
  )
}