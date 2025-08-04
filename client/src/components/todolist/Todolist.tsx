import { useEffect, useState } from "react";
import { getLists, updateTodo, deleteTodo, updateStatus } from "../../services/Todolist";
interface Todo {
    id: number;
    title: string;
    description: string;
    due_date: string;
    priority: string;
    is_done: number;
}

function Todolist() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
    const [keyword, setKeyword] = useState('');
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("normal");

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getLists();
                setTodos(response.data);
                setFilteredTodos(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách:", error);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        setFilteredTodos(todos);
    }, [todos]);

    const handleInfoClick = (todo: any) => {
        if (selectedId === todo.id) {
            setSelectedId(null);
        } else {
            setSelectedId(todo.id);
            setTitle(todo.title);
            setDescription(todo.description || "");
            setDueDate(todo.due_date?.slice(0, 10) || "");
            setPriority(todo.priority || "normal");
        }
    };

    const handleSearch = () => {
        const search = keyword.trim().toLowerCase();
        const results = todos.filter((todo) =>
            todo.title.toLowerCase().includes(search)
        );
        setFilteredTodos(results);
    };

    const handleUpdate = () => {
        if (selectedId === null) return;

        const updatedTodo: Partial<Todo> = {
            title,
            description,
            due_date: dueDate,
            priority,
        };
        updateTodo(selectedId, updatedTodo)
            .then(() => {
                setTodos(prevTodos =>
                    prevTodos.map(todo =>
                        todo.id === selectedId ? { ...todo, ...updatedTodo } : todo
                    )
                );
                setSelectedId(null);
            })
            .catch((error) => {
                console.error("Lỗi khi cập nhật todo:", error);
            });
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTodo(id);
            setTodos(prev => prev.filter(todo => todo.id !== id));
        } catch (error) {
            console.error("Lỗi khi xóa todo:", error);
        }
    };

    const handleCheckboxChange = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };
    const handleBulkDone = async () => {
        try {
            await Promise.all(
                selectedIds.map(id => updateStatus(id, 1))
            );
            setTodos(prev =>
                prev.map(todo =>
                    selectedIds.includes(todo.id) ? { ...todo, is_done: 1 } : todo
                )
            );
            setSelectedIds([]);
        } catch (err) {
            console.error("Lỗi khi cập nhật trạng thái done:", err);
        }
    };

    const handleBulkDelete = async () => {
        try {
            await Promise.all(
                selectedIds.map(id => deleteTodo(id))
            );
            setTodos(prev => prev.filter(todo => !selectedIds.includes(todo.id)));
            setSelectedIds([]);
        } catch (err) {
            console.error("Lỗi khi xóa:", err);
        }
    };
    return (
        <div className="p-4 mt-5 bg-white shadow sm:rounded-[10px] w-full max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-blue-700 font-semibold text-xl">Todo list</h2>
                <form
                    className="flex items-center border border-blue-600 rounded-md overflow-hidden"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}
                >
                    <input
                        type="text"
                        placeholder="keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleSearch();
                            }
                        }}
                        className="px-3 py-2 text-sm text-gray-700 focus:outline-none"
                    />
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="px-3 py-2 text-gray-700 hover:text-black focus:outline-none"
                        aria-label="Search"
                    >
                        <span className="material-icons">search</span>
                    </button>
                </form>
            </div>

            <div className="space-y-4 mb-6">
                {filteredTodos.map((todo) => (
                    <div key={todo.id} className="bg-gray-100 p-3 rounded-md space-y-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(todo.id)}
                                    onChange={() => handleCheckboxChange(todo.id)}
                                />
                                <span className={`text-white text-xs font-semibold rounded px-2 py-0.5 
                                    ${todo.priority === 'high' ? 'bg-orange-600' :
                                        todo.priority === 'normal' ? 'bg-gray-500' :
                                            'bg-green-600'}`}>
                                    {todo.priority}
                                </span>
                                <span className="text-sm text-gray-800">{todo.title}</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-600 text-sm">
                                <button onClick={() => handleDelete(todo.id)} className="hover:text-gray-900"><span className="material-icons">delete</span></button>
                                <button onClick={() => handleInfoClick(todo)} className="hover:text-gray-900">
                                    <span className="material-icons">info</span>
                                </button>
                            </div>
                        </div>

                        {selectedId === todo.id && (
                            <form className="bg-white p-4 rounded-md shadow space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block mb-1 font-semibold text-gray-700">Title:</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-semibold text-gray-700">Description:</label>
                                    <textarea
                                        rows={3}
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-y"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1">
                                        <label className="block mb-1 font-semibold text-gray-700">Due Date:</label>
                                        <input
                                            type="date"
                                            value={dueDate}
                                            onChange={e => setDueDate(e.target.value)}
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-mono"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block mb-1 font-semibold text-gray-700">Priority:</label>
                                        <select
                                            value={priority}
                                            onChange={e => setPriority(e.target.value)}
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                        >
                                            <option value="low">low</option>
                                            <option value="normal">normal</option>
                                            <option value="high">high</option>
                                        </select>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    onClick={handleUpdate}
                                    className="w-full bg-blue-800 text-white font-semibold py-2 rounded-md hover:bg-blue-900"
                                >
                                    Update
                                </button>
                            </form>
                        )}
                    </div>
                ))}
            </div>

            <div className="bg-gray-100 rounded-lg p-4 flex justify-between items-center text-gray-700">
                <span>Bulk Action</span>
                <div className="flex space-x-3">
                    <button
                        type="button"
                        onClick={handleBulkDone}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-1"
                    >
                        <i className="fas fa-check"></i>
                        <span>Done</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleBulkDelete}
                        className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 flex items-center space-x-1"
                    >
                        <i className="fas fa-trash-alt"></i>
                        <span>Remove</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Todolist;
