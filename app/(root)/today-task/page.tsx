"use client";
import React, { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

type Task = {
  id: number;
  task: string;
  isComplete: boolean;
  createdAt: string;
};

const CELEBRATION_KEY = "tasksCelebrationDone";
const CELEBRATION_DAY_KEY = "tasksCelebrationDay";

const page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [show, setShow] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const prevProgress = useRef(0);

  const completedCount = tasks.filter((t) => t.isComplete).length;
  const totalCount = tasks.length;
  const progress =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDay = localStorage.getItem(CELEBRATION_DAY_KEY);

    if (storedDay !== today) {
      localStorage.removeItem(CELEBRATION_KEY);
      localStorage.setItem(CELEBRATION_DAY_KEY, today);
    }
  }, []);

  useEffect(() => {
    if (totalCount === 0) return;

    const alreadyCelebrated = localStorage.getItem(CELEBRATION_KEY);

    if (
      prevProgress.current < 100 &&
      progress === 100 &&
      !alreadyCelebrated
    ) {
      setCelebrate(true);
      localStorage.setItem(CELEBRATION_KEY, "true");

      const timer = setTimeout(() => setCelebrate(false), 6000);
      return () => clearTimeout(timer);
    }

    if (progress < 100) {
      localStorage.removeItem(CELEBRATION_KEY);
    }

    prevProgress.current = progress;
  }, [progress, totalCount]);

  const fetchTodayTasks = async () => {
    const res = await fetch("/api/tasks/today", { cache: "no-store" });
    const data = await res.json();
    setTasks(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchTodayTasks();
  }, []);

  const markDone = async (id: number) => {
    const res = await fetch(`/api/tasks/complete/${id}`, { method: "PATCH" });
    const updated = await res.json();

    setTasks((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  return (
    <>
    {celebrate && (
          <Confetti
            width={1200}
            height={520}
            numberOfPieces={600}
            recycle={false}
            gravity={0.3}
            className="absolute inset-0 pointer-events-none z-20"
          />
        )}
      <h1 className="">Today's Tasks</h1>

      <div className="relative mt-4">
        

        <div
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className={`h-[320px] rounded overflow-y-auto transition-all border ${
            show ? "scroll-show" : "scroll-hide"
          }`}
        >
          <table className="w-full border-collapse table-fixed">
            <thead className="sticky top-0 z-10 bg-blue-500">
              <tr className="text-left text-sm text-black border-b">
                <th className="p-3">Task</th>
                <th className="p-3 w-24 text-center">Mark</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className={`border-b transition ${
                    task.isComplete
                      ? "bg-green-300"
                      : "bg-red-300 hover:bg-red-200"
                  }`}
                >
                  <td className="p-3">{task.task}</td>
                  <td className="text-center pr-2">
                    <button
                      disabled={task.isComplete}
                      onClick={() => markDone(task.id)}
                      className={`p-1 rounded text-sm transition ${
                        task.isComplete
                          ? "bg-green-500 text-white cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      {task.isComplete ? "Completed" : "Mark Done"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default page;
