"use client";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const RegisterForm = () => {
  const [email,setemail] = useState<string>("");
  const [password,setpassword] = useState<string>("");
  const [error,seterror] = useState<string>("");

  const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    seterror("");

    const res = await fetch("/api/register",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email,password})
    });

    const data:{id?:number; email?:string; error?:string} = await res.json();

    if(!res.ok){
      window.alert("Registration Failed!");
      return;
    }

    alert("Registered Successfully");
    setemail("");
    setpassword("")

  }
  return (
    <div className="text-black">
      <form className="flex flex-col md:p-6 p-4 gap-y-6" onSubmit={handleSubmit}>
        <div className="flex justify-center md:mt-0 mt-12 flex-col items-center">
          <Image
            src={"/logo-4.svg"}
            alt="Shypbuddy-logo"
            width={384}
            height={84}
            className="w-20"
          ></Image>
          <h1 className="font-semibold">Buddy Tasks</h1>
          <h1 className="text-xl font-semibold mt-5">Register</h1>
        </div>
        <div className="mt-2 flex flex-col gap-y-8">
          <input
            type="email"
            className="bg-gray-200 p-2 text-gray-600 rounded-lg border border-gray-400"
            placeholder="Enter your Email"
            value={email}
            onChange={(e)=>{setemail(e.target.value)}}
            required
          ></input>
          <div className="flex flex-col">
          <input
            type="password"
            className="bg-gray-200 p-2 text-gray-600 rounded-lg border border-gray-400"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>{setpassword(e.target.value)}}
            required
          ></input>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <button
            type="submit"
            className="bg-blue-400 p-2 rounded-lg cursor-pointer hover:bg-blue-500"
          >
            Register
          </button>
          <Link
            className="bg-red-400 text-center hover:bg-black hover:text-white p-2 rounded-lg cursor-pointer"
            href={"/login"}
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;


