"use client";
import React, { FormEvent, useState, useEffect } from "react";
type Task = {
  id: number;
  task: string;
  isComplete: boolean;
};

const page = () => {
  const [update, isupdate] = useState(false);
  const [task, settask] = useState<string>("");
  const [tasks, settasks] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const handleEdit = (id: number, text: string) => {
    setIsEditing(true);
    setEditId(id);
    settask(text);
  };

  const deleteTask = async (id: number) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    settasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdate = async () => {
    if (!editId) return;

    const res = await fetch(`/api/update-task/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });

    const updated = await res.json();

    settasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));

    settask("");
    setIsEditing(false);
    setEditId(null);
  };

  const fetchTasks = async () => {
    const res = await fetch("/api/get-tasks");
    if (!res.ok) return;

    const data: Task[] = await res.json();
    settasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/add-task", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ task }),
    });

    if (!res.ok) {
      alert("Failed to Add Task");
      return;
    }

    alert("Task Added Successfully!!");
    settask("");
    fetchTasks();
  };
  return (
    <div>
      <h1 className="">Add Tasks</h1>
      <div className="mt-4">
        <form className="flex flex-col gap-y-4" onSubmit={handlesubmit}>
          <input
            type="text"
            value={task}
            placeholder="new task"
            className="p-2 border w-full rounded-lg border-gray-400 bg-blue-100"
            onChange={(e) => settask(e.target.value)}
          />
          <div className="flex gap-4 justify-end">
            <button
              disabled={isEditing}
              className={`py-2 px-4 rounded-lg ${
                isEditing
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-400 hover:bg-blue-500"
              }`}
            >
              + Add
            </button>

            <button
              type="button"
              disabled={!isEditing}
              onClick={handleUpdate}
              className={`py-2 px-4 rounded-lg ${
                isEditing
                  ? "bg-yellow-300 hover:bg-yellow-400"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Update
            </button>
          </div>
        </form>

        <div className=" mt-4 overflow-scroll h-60 scroll-smooth">
          <table className="w-full border-collapse table-fixed ">
            <thead className="sticky top-0 z-10 bg-blue-500">
              <tr className="text-left text-sm text-black border-b ">
                <th className="p-3">Task</th>
                <th
                  className="p-3 w-24 text-center"
                  
                >
                  Edit
                </th>
                <th className="p-3 w-24 text-center">Delete</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((t) => (
                <tr key={t.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 wrap-break-words">{t.task}</td>
                  <td className="text-center">
                    <button className="text-red-500 hover:underline" onClick={() => handleEdit(t.id, t.task)}>
                      Edit
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => deleteTask(t.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default page;
