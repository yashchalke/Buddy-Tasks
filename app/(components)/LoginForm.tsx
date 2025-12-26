"use client";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
// import { toast } from "sonner";
import { z } from "zod";

const LoginForm = () => {
  const router = useRouter();
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [errors,seterrors] = useState<{email?:string;password?:string}>({});
  

  const loginschema = z.object({
    email:z.string().email("Enter valid Email address."),
    password:z.string().min(6,"password must be minimum 6 characters")
  });

  const validateInputs = (newEmail:string,newPassword:string)=>{
    const result = loginschema.safeParse({
      email:newEmail,
      password:newPassword,
    })

    if(!result.success){
      const fieldErrors = result.error.flatten().fieldErrors;

      seterrors({
        email:fieldErrors.email?.[0],
        password:fieldErrors.password?.[0],
      })
    }
    else{
      seterrors({})
    }
  }

  const handlesubmit = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    
    const res = await fetch("/api/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email,password})
    });

    const data: {email?:string,success?:string,error?:string} = await res.json();

    if(!res.ok){
      alert("Login Failed")
    }

    alert("Login Successful!!");

    router.push("/")
  };

  return (
    <div className="text-black">
      <form className="flex flex-col md:p-6 p-4 gap-y-6" onSubmit={handlesubmit}>
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
            onChange={(e) => {setemail(e.target.value);validateInputs(e.target.value,password)}}
          ></input>
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div>
          <input
            className="bg-gray-200 p-2 text-gray-600 rounded-lg w-full border border-gray-400"
            placeholder="Enter your password"
            onChange={(e) => {setpassword(e.target.value);validateInputs(email,e.target.value)}}
          >
          </input>
          {errors.password && <p className="text-red-500">{errors.password}</p>}
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
