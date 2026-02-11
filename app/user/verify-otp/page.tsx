"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import Orb from "@/app/components/BackgroundBlur";
import { AppDispatch, RootState } from "@/redux/store";
import { clearSignUpData } from "@/redux/authSlice";


const VerifyOtp = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { signUpData } = useSelector((state: RootState) => state.auth);

  const [otp, setOtp] = useState<string>("");

  const userId = signUpData?.userId;

  const handleOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId) return;

    try {
      await axios.post(
        "http://localhost:4000/api/v1/user/verify-otp",
        { otp, userId }
      );
      dispatch(clearSignUpData());
      router.push("/user/login");
    } catch (error: any) {
      console.log(error.response?.data || error);
    }
  };

  const handleResendOtp = async () => {
    if (!userId) return;

    try {
      await axios.post("http://localhost:4000/api/v1/user/resend-otp", { userId });
    } catch (error: any) {
      console.log(error.response?.data || error);
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

      <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-md rounded-2xl p-8 bg-[rgba(20,20,36,0.6)] border border-[rgba(100,100,140,0.12)] backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-center">
            Verify Your Email
          </h2>

          <p className="mt-2 text-center text-sm text-gray-300">
            We sent a verification code to{" "}
            <span className="font-medium">
              {signUpData?.email}
            </span>
          </p>

          <form
            onSubmit={handleOtp}
            className="mt-8 flex flex-col gap-5"
          >
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full rounded-lg px-4 py-3 text-center text-xl tracking-[0.5em]
                         bg-[rgba(10,10,20,0.8)] border border-gray-600
                         focus:outline-none focus:border-violet-500"
            />

            <button
              type="submit"
              disabled={otp.length !== 6}
              className="py-3 rounded-xl font-semibold
                         bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4]
                         disabled:opacity-50"
            >
              Verify Email →
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Didn’t receive the code?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-violet-400 hover:text-violet-300"
              >
                Resend OTP
              </button>
            </p>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => router.push("/user/login")}
              className="text-xs text-gray-400 hover:text-gray-300"
            >
              ← Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
