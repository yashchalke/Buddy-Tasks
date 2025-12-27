"use client";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
// import { toast } from "sonner";
import { z } from "zod";
import { loginSchema } from "@/lib/validators/authSchema";
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errors, seterrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = loginSchema.safeParse({ email });

    if (!parsed.success) {
      const fieldErrors: any = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });
      setFormErrors(fieldErrors);
      return;
    }

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data: { email?: string; success?: string; error?: string } =
      await res.json();

    if (!res.ok) {
      toast.error("Invalid Credentials");
      return;
    }

    toast.success("Login Successful!!");
    setpassword("");

    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <div className="text-black">
      <form
        className="flex flex-col md:p-6 p-4 gap-y-6"
        onSubmit={handlesubmit}
      >
        <div className="flex justify-center md:mt-0 mt-12 flex-col items-center">
          <Image
            src={"/logo-4.svg"}
            alt="Shypbuddy-logo"
            width={384}
            height={84}
            className="w-20"
          ></Image>
          <h1 className="font-semibold text-3xl">Buddy Tasks</h1>
          <h1 className="text-xl font-semibold mt-5">Login</h1>
        </div>
        <div className="mt-2 flex flex-col gap-y-8">
          <div className="w-full">
            <input
              className="bg-gray-200 p-2 text-gray-600 rounded-lg w-full border border-gray-400"
              value={email}
              placeholder="Enter your Email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            ></input>
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              className="bg-gray-200 p-2 text-gray-600 rounded-lg w-full border border-gray-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <button
            type="submit"
            className="bg-blue-400 p-2 rounded-lg cursor-pointer hover:bg-blue-500"
          >
            Sign in
          </button>
          <Link
            className="bg-red-400 text-center hover:bg-black hover:text-white p-2 rounded-lg cursor-pointer"
            href={"/register"}
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
