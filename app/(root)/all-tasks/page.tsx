"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AllTasksDates = () => {
  const [dates, setDates] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDates = async () => {
      const res = await fetch("/api/tasks/dates", { cache: "no-store" });
      const data = await res.json();
      setDates(Array.isArray(data) ? data : []);
    };
    fetchDates();
  }, []);

  return (
    <div>
      <h1 className="mb-4">All Tasks</h1>

      <div className="flex flex-col gap-y-4 overflow-scroll h-80">
        {dates.map(date => (
          <button
            key={date}
            onClick={() => router.push(`/all-tasks/${date}`)}
            className="bg-purple-400 p-3 rounded-lg hover:bg-purple-600 text-left border"
          >
            {new Date(date).toDateString()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllTasksDates;
