"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Orb from "@/app/components/BackgroundBlur";

const Login = () => {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/v1/user/sign-in", {
        identifier,
        password,
      });
      console.log(res.data);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000f5] text-white">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Orbs */}
        <Orb style="w-[500px] h-[500px] bg-[#8b5cf6] top-[-100px] left-[-120px]" />
        <Orb style="w-[400px] h-[400px] bg-[#06b6d4] top-[200px] right-[-80px]" />
        <Orb style="w-[300px] h-[300px] bg-[#ec4899] bottom-[60px] left-[30%]" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

   
      <div className="relative z-10 flex justify-center items-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md">
        
          <div
            className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase
              text-[#c4b5fd] bg-[rgba(139,92,246,0.12)] border border-[rgba(139,92,246,0.28)] w-fit mx-auto mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Welcome Back
          </div>

          <div
            className="relative rounded-2xl p-8
              bg-[rgba(20,20,36,0.6)]
              border border-[rgba(100,100,140,0.12)]
              backdrop-blur-sm
              shadow-[0_0_60px_rgba(139,92,246,0.15)]"
          >
            <h2 className="text-3xl font-bold text-center text-white font-['Playfair_Display',serif]">
              Sign In
            </h2>
            <p className="mt-2 text-center text-sm text-[rgba(180,180,210,0.75)]">
              Access your DocMaster workspace
            </p>

            <form className="mt-8 flex flex-col gap-5" onSubmit={handleLogin}>
              {[
                {
                  label: "Email or Username",
                  type: "text",
                  value: identifier,
                  setValue: setIdentifier,
                  placeholder: "Enter email or username",
                },
                {
                  label: "Password",
                  type: "password",
                  value: password,
                  setValue: setPassword,
                  placeholder: "Enter password",
                },
              ].map((field) => (
                <div key={field.label} className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-[rgba(180,180,210,0.8)] font-['DM_Sans',sans-serif]">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) => field.setValue(e.target.value)}
                    className="
                      w-full rounded-lg px-4 py-2.5
                      bg-[rgba(10,10,20,0.8)]
                      border border-[rgba(100,100,140,0.25)]
                      text-white
                      placeholder:text-[rgba(150,150,180,0.5)]
                      focus:outline-none
                      focus:border-[#8b5cf6]
                      focus:ring-2 focus:ring-[#8b5cf6]/40
                      transition-all duration-300
                      font-['DM_Sans',sans-serif]"
                  />
                </div>
              ))}

              <div className="flex justify-end -mt-2">
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-xs text-[#a78bfa] hover:text-[#c4b5fd] transition-colors duration-200"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="
                  mt-4 py-3 rounded-xl text-sm font-semibold text-white
                  bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4]
                  shadow-[0_4px_30px_rgba(139,92,246,0.35)]
                  hover:shadow-[0_6px_40px_rgba(139,92,246,0.55)]
                  transition-all duration-300"
              >
                Sign In →
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-[rgba(100,100,140,0.2)]" />
              <span className="text-xs text-[rgba(150,150,180,0.7)] uppercase tracking-wider">
                or
              </span>
              <div className="flex-1 h-px bg-[rgba(100,100,140,0.2)]" />
            </div>

            {/* Sign up link */}
            <p className="mt-6 text-center text-sm text-[rgba(180,180,210,0.75)]">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/user/signUp")}
                className="text-[#a78bfa] hover:text-[#c4b5fd] font-medium transition-colors duration-200"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;