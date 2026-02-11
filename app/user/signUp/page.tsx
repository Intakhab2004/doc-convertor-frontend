"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import Orb from "@/app/components/BackgroundBlur";
import { setSignUpData } from "@/redux/authSlice";
import type { AppDispatch } from "@/redux/store";

const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/sign-up",
        { username, email, password, confirmPassword }
      ); 

      dispatch(
        setSignUpData({
          userId: res.data.userId,
          email,
        })
      );

      router.push("/user/verify-otp");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000f5] text-white">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <Orb style="w-[500px] h-[500px] bg-[#8b5cf6] top-[-100px] left-[-120px]" />
        <Orb style="w-[400px] h-[400px] bg-[#06b6d4] top-[200px] right-[-80px]" />
        <Orb style="w-[300px] h-[300px] bg-[#ec4899] bottom-[60px] left-[30%]" />
      </div>

      <div className="relative z-10 flex justify-center items-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <span className="px-4 py-1.5 rounded-full text-xs uppercase tracking-widest
              text-[#c4b5fd] bg-[rgba(139,92,246,0.12)] border border-[rgba(139,92,246,0.28)]">
              Get Started
            </span>
          </div>

          <div className="rounded-2xl p-8 bg-[rgba(20,20,36,0.6)]
              border border-[rgba(100,100,140,0.12)] backdrop-blur-sm">

            <h2 className="text-3xl font-bold text-center">
              Create Account
            </h2>

            <p className="mt-2 text-center text-sm text-gray-400">
              Join thousands of creators using DocMaster
            </p>

            <form
              className="mt-8 flex flex-col gap-5"
              onSubmit={handleSubmit}
            >
              {[
                {
                  label: "Username",
                  type: "text",
                  value: username,
                  setValue: setUsername,
                  placeholder: "Enter username",
                },
                {
                  label: "Email",
                  type: "email",
                  value: email,
                  setValue: setEmail,
                  placeholder: "Enter email",
                },
                {
                  label: "Password",
                  type: "password",
                  value: password,
                  setValue: setPassword,
                  placeholder: "Enter password",
                },
                {
                  label: "Confirm Password",
                  type: "password",
                  value: confirmPassword,
                  setValue: setConfirmPassword,
                  placeholder: "Confirm password",
                },
              ].map((field) => (
                <div key={field.label} className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-gray-400">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) => field.setValue(e.target.value)}
                    className="w-full rounded-lg px-4 py-2.5
                      bg-[rgba(10,10,20,0.8)]
                      border border-gray-600
                      focus:outline-none focus:border-violet-500"
                  />
                </div>
              ))}

              <button
                type="submit"
                className="mt-4 py-3 rounded-xl font-semibold
                  bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4]"
              >
                Create Account →
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/user/login")}
                className="text-violet-400 hover:text-violet-300"
              >
                Sign In
              </button>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
