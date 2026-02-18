"use client"

import Orb from "@/app/components/BackgroundBlur";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { otpVerifySchema } from "@/schemas/otpSchema";
import api from "@/services/apiUrl";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";



export default function VerifyOtpPage(){
    const params = useParams<{id: string}>();
    const [loader, setLoader] = useState(false);
    const [resendLoader, setResendLoader] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);
    const router = useRouter()

    const form = useForm<z.infer<typeof otpVerifySchema>>({
        resolver: zodResolver(otpVerifySchema),
        defaultValues: {
            otp: ""
        }
    });

    useEffect(() => {
        if(resendTimer > 0){
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }

    }, [resendTimer])


    const submitHandler = async(data: z.infer<typeof otpVerifySchema>) => {
        setLoader(true);
        try{
            const response = await api.post("/user/verify-otp", {userId: params.id, otp: data.otp});
            if(response.data.success){
                const toastId = toast(
                    "Success ✅",
                    {
                        description: response.data.message,
                        action: {
                            label: "Dismiss",
                            onClick: () => {
                                toast.dismiss(toastId);
                            }
                        }
                    }
                )

                router.replace("/sign-in");
            }
        }
        catch(error: unknown){
            if(isAxiosError(error)){
                console.log("Something went wrong while verifying otp: ", error.response?.data);
                const toastId = toast(
                    "Something went wrong while verifying otp",
                    {
                        description: error.response?.data?.message,
                        action: {
                            label: "Dismiss",
                            onClick: () => {
                                toast.dismiss(toastId);
                            }
                        }
                    }
                )
            }
            else if(error instanceof Error){
                console.log("General error:", error.message);
                const toastId = toast(
                    "Unexpected error",
                    {
                        description: error.message,
                        action: {
                            label: "Dismiss",
                            onClick: () => {
                                toast.dismiss(toastId)
                            },
                        },
                    }
                )
            }
            else{
                console.log("An unknown error: ", error);
                const toastId = toast(
                    "Something went wrong",
                    {
                        description: "Please try again later",
                        action: {
                            label: "Dismiss",
                            onClick: () => {
                                toast.dismiss(toastId)
                            },
                        },
                    }
                )
            }
        }
        finally{
            setLoader(false);
        }
    }


    const handleResendOtp = async() => {
        setResendLoader(true);
        try{
            const response = await api.post("/user/resend-otp", {userId: params.id});
            if(response.data.success){
                const toastId = toast(
                    "Success ✅",
                    {
                        description: response.data.message,
                        action: {
                            label: "Dismiss",
                            onClick: () => {
                                toast.dismiss(toastId);
                            }
                        }
                    }
                )
                setResendTimer(30);
            }
        }
        catch(error: unknown){
            if(isAxiosError(error)){
                console.log("Something went wrong while resending otp: ", error.response?.data);
                const toastId = toast(
                    "Something went wrong while resending otp",
                    {
                        description: error.response?.data?.message,
                        action: {
                            label: "Dismiss",
                            onClick: () => {
                                toast.dismiss(toastId);
                            }
                        }
                    }
                )
            }
            else if(error instanceof Error){
                console.log("General error:", error.message);
                const toastId = toast(
                    "Unexpected error",
                    {
                        description: error.message,
                        action: {
                            label: "Dismiss",
                            onClick: () => {
                                toast.dismiss(toastId)
                            },
                        },
                    }
                )
            }
            else{
                console.log("An unknown error: ", error);
                const toastId = toast(
                    "Something went wrong",
                    {
                        description: "Please try again later",
                        action: {
                            label: "Dismiss",
                            onClick: () => {
                                toast.dismiss(toastId)
                            },
                        },
                    }
                )
            }
        }
        finally{
            setResendLoader(false);
        }
    }


    return (
        <div className="min-h-screen bg-[#000000f5] text-white">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <Orb style="w-[500px] h-[500px] bg-[#8b5cf6] top-[-100px] left-[-120px]" />
                <Orb style="w-[400px] h-[400px] bg-[#06b6d4] top-[200px] right-[-80px]" />
                <Orb style="w-[300px] h-[300px] bg-[#ec4899] bottom-[60px] left-[30%]" />
            </div>

            <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 py-12">
                <div className="p-7 md:p-10 bg-[rgba(18,18,32,0.72)] border border-[rgba(100,100,140,.13)] rounded-3xl backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,.25)]">
                    <h1 className="text-3xl font-bold text-center text-white font-['Cormorant_Garamond',serif]">
                        Enter Verification Code
                    </h1>
                    <p className="text-[rgba(160,160,190,0.7)] text-center mt-2 text-sm font-['Cormorant_Garamond',serif]">
                        We&apos;ve sent a 6-digit code to your registered email
                    </p>

                    {/* Form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submitHandler)} className="mt-5 grid grid-cols-1 gap-4">
                            <FormField
                                control={form.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="text-[13px] text-[rgba(180,180,210,.78)]">Your OTP</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="XXXXXX"
                                            className="text-[14px] border-[rgba(100,100,140,.2)] text-white placeholder:text-white/40 focus-visible:ring-0"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <button
                                disabled={loader}
								type="submit"
								className={`w-fit -mt-1 flex items-center gap-1 px-6 py-2 rounded-lg text-sm font-semibold text-white transition-all 
									duration-300 bg-gradient-to-br from-violet-500 to-cyan-500 shadow-[0_0_18px_rgba(139,92,246,0.35)]
									${loader ? "hover:shadow-[0_0_18px_rgba(139,92,246,0.35)] cursor-not-allowed" : "hover:shadow-[0_0_18px_rgba(139,92,246,0.55)] cursor-pointer"}`}
							>
								{
									loader ? (
												<>
													<Loader2 className="mr-2 h-5 w-5 animate-spin"/> Please wait
												</>
									) 
									: 
									("Submit →")
								}
							</button>
                        </form>
                    </Form>


                    <div className="mt-6 flex items-center justify-between px-5 py-4 rounded-[14px] bg-[#8b5cf6]/5 border border-[rgba(100,100,140,.13)]">
                        {
                            resendTimer > 0 ? (
                                <span className="text-[13px] text-[rgba(140,140,165,.55)] font-['Outfit']">
                                    Resend OTP in
                                    <span className="ml-1 text-[rgba(180,180,210,.78)] font-semibold">
                                        {`${resendTimer} sec`}
                                    </span>
                                </span>
                            )
                            :
                            (
                                <span className="text-[13px] text-[rgba(180,180,210,.78)] font-['Outfit']">
                                    Now you can resend OTP
                                </span>
                            )
                        }
                        <button
                            onClick={handleResendOtp}
                            disabled={resendTimer > 0 || resendLoader}
                            className={`bg-transparent border-none text-[13px] font-semibold font-['Outfit'] text-[#8b5cf6] 
                                transition-colors duration-200 p-0 ${resendTimer > 0 || resendLoader ? "text-gray-400 cursor-not-allowed opacity-60"
                                : "text-[#8b5cf6] hover:text-[#06b6d4] cursor-pointer"}`}
                        >
                            {
                                resendLoader ? (
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin"/>
                                )
                                :
                                ("Resend Code →")
                            }
                        </button>
                    </div>

                    <div className="h-[1px] mt-4 bg-[rgba(140,140,165,.55)]"></div>

                    <div className="mt-4 px-5 py-4 rounded-[14px] bg-[rgba(18,18,32,0.72)] border border-[rgba(100,100,140,.13)]">
                        <p className="text-[12px] text-[rgba(140,140,165,.55)] leading-[1.6] font-['Outfit'] m-0">
                            <span className="inline">
                                <strong className="text-[rgba(180,180,210,.78)] font-semibold">
                                    Having trouble?
                                </strong>
                            </span>
                            <span className="inline ml-1">
                                Check your spam folder or
                            </span>
                            <Link
                                href="/contact"
                                className="ml-1 text-[#8b5cf6] font-semibold no-underline hover:opacity-80 transition-opacity duration-200"
                            >
                                contact support
                            </Link>
                        </p>
                    </div>


                    <p className="text-center text-[13px] text-[rgba(140,140,165,.55)] mt-7 font-['Outfit']">
                        <Link
                            href="/sign-up"
                            className="text-[rgba(180,180,210,.78)] font-medium no-underline inline-flex items-center gap-1.5 
                                transition-colors duration-200 hover:text-[#8b5cf6]"
                        >
                            ← Back to Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}