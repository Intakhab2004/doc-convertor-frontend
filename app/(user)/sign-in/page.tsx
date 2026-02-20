"use client";

import Orb from "@/app/components/BackgroundBlur";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { isAxiosError } from "axios";
import api from "@/services/apiUrl";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signinSchema } from "@/schemas/signinSchema";
import { useAuth } from "@/context/AuthContext";



const SignInPage = () => {
	const [loader, setLoader] = useState(false);
	const { setIsAuthenticated } = useAuth();
	const router = useRouter();

	const form = useForm<z.infer<typeof signinSchema>>({
		resolver: zodResolver(signinSchema),
		defaultValues: {
			identifier: "",
			password: ""
		}
	})

	const submitHandler = async(data: z.infer<typeof signinSchema>) => {
		setLoader(true);
		try{
			const response = await api.post("/user/sign-in", data);
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

				localStorage.setItem("accessToken", response.data.accessToken);
				setIsAuthenticated(true);
				router.replace("/");
            }
		}
		catch(error: unknown){
			if(isAxiosError(error)){
                console.log("Something went wrong while login: ", error.response?.data);
                const toastId = toast(
                    "Something went wrong while login",
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


    return (
      	<div className="min-h-screen bg-[#000000f5] text-white">
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<Orb style="w-[500px] h-[500px] bg-[#8b5cf6] top-[-100px] left-[-120px]" />
				<Orb style="w-[400px] h-[400px] bg-[#06b6d4] top-[200px] right-[-80px]" />
				<Orb style="w-[300px] h-[300px] bg-[#ec4899] bottom-[60px] left-[30%]" />
			</div>

			<div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 py-12">
				<div className="w-fit mb-7 flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase
						text-[#c4b5fd] bg-[rgba(139,92,246,0.12)] border border-[rgba(139,92,246,0.28)]"
				>
					<span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
					Welcome Back
				</div>

				<div className="w-full max-w-lg p-7 md:p-10 bg-[rgba(18,18,32,0.72)] border border-[rgba(100,100,140,.13)] rounded-3xl backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,.25)]">
					<h2 className="text-3xl font-bold text-center font-['Cormorant_Garamond',serif]">
						Sign In
					</h2>
					<p className="text-[rgba(160,160,190,0.7)] text-center mt-2 text-sm font-['Cormorant_Garamond',serif]">
						Access your DocMaster workspace
					</p>
					
					<Form {...form}>
						<form onSubmit={form.handleSubmit(submitHandler)} className="mt-5 grid grid-cols-1 gap-4">
							<FormField
                                control={form.control}
                                name="identifier"
                                render={({ field }) => (
                                    <FormItem>
										<FormLabel className="text-[13px] text-[rgba(180,180,210,.78)]">Email or Username</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter email or username"
												className="text-[14px] border-[rgba(100,100,140,.2)] text-white placeholder:text-white/40 focus-visible:ring-0"
												{...field}
											/>
										</FormControl>
										<FormMessage />
                                    </FormItem>
                                )}
                            />

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-[13px] text-[rgba(180,180,210,.78)]">Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Your Password"
												className="text-[14px] border-[rgba(100,100,140,.2)] text-white placeholder:text-white/40 focus-visible:ring-0"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex justify-end">
								<button
									type="button"
									onClick={() => router.push("/forgot-password")}
									className="text-xs text-violet-400 hover:text-cyan-400 transition-colors duration-200"
								>
									Forgot Password?
								</button>
							</div>

							<button
								disabled={loader}
								type="submit"
								className="w-fit mt-2 flex items-center gap-1 px-6 py-2 rounded-lg text-sm font-semibold text-white transition-all 
									duration-300 bg-gradient-to-br from-violet-500 to-cyan-500 shadow-[0_0_18px_rgba(139,92,246,0.35)]
									hover:shadow-[0_0_18px_rgba(139,92,246,0.55)] cursor-pointer"
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

					<div className="mt-6 flex items-center gap-3">
						<div className="flex-1 h-px bg-[rgba(100,100,140,0.2)]" />
							<span className="text-xs text-[rgba(150,150,180,0.7)] uppercase tracking-wider">
								or
							</span>
						<div className="flex-1 h-px bg-[rgba(100,100,140,0.2)]" />
					</div>

					<p className="mt-6 text-center text-sm text-gray-400">
						Don't have an account?{" "}
						<button
						  	onClick={() => router.push("/sign-up")}
							className="text-violet-400 hover:text-violet-300"
						>
							Create Account
						</button>
					</p>
				</div>
			</div>
      	</div>
    )
}

export default SignInPage;