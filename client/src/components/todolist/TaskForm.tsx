import { useState } from "react";
import { notification } from 'antd';
import { addTasks } from "../../services/TaskForm";
function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("normal");

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    dueDate: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      title: title.trim() === "",
      description: description.trim() === "",
      dueDate: dueDate.trim() === "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((v) => v);
    if (hasError) return;
    addTasks({ title, description, dueDate, priority })
      .then(() => {
        notification.success({
          message: 'Thành công!',
          description: 'Tạo công việc mới thành công.',
          placement: 'topRight',
          duration: 3,
        });
        setTitle("");
        setDescription("");
        setDueDate("");
        setPriority("normal");
        setErrors({ title: false, description: false, dueDate: false });
      })
      .catch((err) => {
        console.error("Lỗi khi gửi:", err);
      });
  };

  return (
    <form className="w-full max-w-md bg-white p-4 rounded-md shadow-md mt-5 ml-4" onSubmit={handleSubmit} noValidate>
      <h2 className="text-center text-gray-700 font-semibold text-lg mb-6">
        New Task
      </h2>
      <label className="block mb-1 font-medium text-gray-700">
        Title: <span className="ml-1 text-sm font-normal text-red-600">*</span>
        {errors.title && (
          <span className="ml-1 text-sm font-normal text-red-600">
            Required
          </span>
        )}
      </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`w-full px-3 py-2 mb-4 border rounded-md ${errors.title ? "border-red-600" : "border-gray-300"
          }`}
      />

      <label className="block mb-1 font-medium text-gray-700">
        Description: <span className="ml-1 text-sm font-normal text-red-600">*</span>
        {errors.description && (
          <span className="ml-1 text-sm font-normal text-red-600">
            Required
          </span>
        )}
      </label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={`w-full px-3 py-2 mb-4 border rounded-md ${errors.description ? "border-red-600" : "border-gray-300"
          }`}
      />

      <label className="block mb-1 font-medium text-gray-700">
        Due Date:<span className="ml-1 text-sm font-normal text-red-600">*</span>
        {errors.dueDate && (
          <span className="ml-1 text-sm font-normal text-red-600">
            Required
          </span>
        )}
      </label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className={`w-full px-3 py-2 mb-4 border rounded-md ${errors.dueDate ? "border-red-600" : "border-gray-300"
          }`}
      />

      <label className="block mb-1 font-medium text-gray-700">Priority:</label>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full px-3 py-2 mb-6 border border-gray-300 rounded-md"
      >
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>

      <button
        type="submit"
        className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
}

export default TaskForm;
