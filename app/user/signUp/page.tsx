"use client";

import Orb from "@/app/components/BackgroundBlur";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/schemas/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDebounceCallback } from 'usehooks-ts'
import axios, { isAxiosError } from "axios";
import { auth } from "@/services/apiUrl";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



const SignUp = () => {
	const [loader, setLoader] = useState(false);
	const [checkUsernameLoader, setCheckUsernameLoader] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameMsg, setUsernameMsg] = useState("");
	const router = useRouter();


	const debounced = useDebounceCallback(setUsername, 300);

	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: ""
		}
	})

	useEffect(() => {
		const checkUsername = async() => {
			if(username){
				setUsernameMsg("");
				setCheckUsernameLoader(true);

				try{
					const response = await axios.get(`${auth.UNIQUE_USERNAME_API}?username=${username}`);
					setUsernameMsg(response.data.message);
				}
				catch(error: unknown){
					if(isAxiosError(error)){
                        console.log("Something went wrong while checking the username: ", error.response?.data);
                        setUsernameMsg(error.response?.data?.message);
                    }
				}
				finally{
					setCheckUsernameLoader(false);
				}
			}
		}

		checkUsername();
	}, [username])

	const submitHandler = async(data: z.infer<typeof signupSchema>) => {
		setLoader(true);
		try{
			const response = await axios.post(auth.SIGNUP_API, data, {withCredentials: true});
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

				form.reset();
				router.push("user/verify-otp");
            }
		}
		catch(error: unknown){
			if(isAxiosError(error)){
                console.log("Something went wrong while sign up: ", error.response?.data);
                const toastId = toast(
                    "Something went wrong while sign up",
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
					Get Started with DocMaster
				</div>

				<div className="p-7 md:p-10 bg-[rgba(18,18,32,0.72)] border border-[rgba(100,100,140,.13)] rounded-3xl backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,.25)]">
					<h2 className="text-3xl font-bold text-center font-['Cormorant_Garamond',serif]">
						Create Account
					</h2>
					<p className="text-[rgba(160,160,190,0.7)] text-center mt-2 text-sm font-['Cormorant_Garamond',serif]">
						Join thousands of creators using DocMaster
					</p>
					
					<Form {...form}>
						<form onSubmit={form.handleSubmit(submitHandler)} className="mt-5 grid grid-cols-1 gap-4">
							<FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="text-[13px] text-[rgba(180,180,210,.78)]">Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Username"
                                            className="text-[14px] border-[rgba(100,100,140,.2)] text-white placeholder:text-white/40 focus-visible:ring-0"
                                            {...field}
											onChange={(e) => {
												field.onChange(e)
												debounced(e.target.value)
											}}
                                        />
                                    </FormControl>
									{
                                        checkUsernameLoader && <Loader2 className="mt-1 h-5 w-5 animate-spin text-green-500" />
                                    }
                                    {
                                        username && (
                                            <p className={`mt-1 text-sm ${usernameMsg === "Username is available" ? "text-green-500" : "text-red-500"}`}>
                                                {usernameMsg}
                                            </p>
                                        )
                                    }
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />

							<FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="text-[13px] text-[rgba(180,180,210,.78)]">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="abc123@gmail.com"
                                            className="text-[14px] border-[rgba(100,100,140,.2)] text-white placeholder:text-white/40 focus-visible:ring-0"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
										<FormLabel className="text-[13px] text-[rgba(180,180,210,.78)]">Password</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter Password"
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
									name="confirmPassword"
									render={({ field }) => (
										<FormItem>
										<FormLabel className="text-[13px] text-[rgba(180,180,210,.78)]">Confirm Password</FormLabel>
										<FormControl>
											<Input
												placeholder="Confirm Password"
												className="text-[14px] border-[rgba(100,100,140,.2)] text-white placeholder:text-white/40 focus-visible:ring-0"
												{...field}
											/>
										</FormControl>
										<FormMessage />
										</FormItem>
									)}
								/>

								<button
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
							</div>
						</form>
					</Form>

					<p className="mt-6 text-center text-sm text-gray-400">
						Already have an account?{" "}
						<button
						//   onClick={() => router.push("/user/login")}
						className="text-violet-400 hover:text-violet-300"
						>
						Sign In
						</button>
					</p>

				</div>
			</div>
      	</div>
    )
}

export default SignUp;
