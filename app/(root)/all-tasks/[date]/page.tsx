"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Task = {
  id: number;
  task: string;
  isComplete: boolean;
};

const Page = () => {
  const { date } = useParams<{ date: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(`/api/tasks/by-date/${date}`, { cache: "no-store" });
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    };

    fetchTasks();
  }, [date]);

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="mb-4">
        Tasks for {new Date(date).toDateString()}
      </h1>
      <div  onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className={`h-[320px] rounded overflow-y-auto transition-all mt-4 ${
        show ? "scroll-show" : "scroll-hide"
      }`}>
      <ul className="flex flex-col gap-y-4  ">
        {tasks.map(t => (
          <li
            key={t.id}
            className={`p-3 rounded border max-w-full overflow-hidden ${
              t.isComplete ? "bg-green-300" : "bg-red-400"
            }`}
          >
            <p className="break-words whitespace-normal leading-relaxed">
              {t.task}
            </p>
          </li>
        ))}
      </ul>
      </div>  
    </div>
  );
};

export default Page;
