"use client";

import React from "react";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/login")}
      className="bg-blue-400 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-500"
    >
      Sign in
    </button>
  );
};

export default LoginButton;
