"use client"

import Orb from "@/app/components/BackgroundBlur"
import ContactCard from "@/app/components/ContactCard"
import SectionHeading from "@/app/components/SectionHeading"
import { Building2, Loader2, Mail, MessageCircleCodeIcon, Phone } from "lucide-react"
import { useForm } from "react-hook-form"
import { contactSchema } from "@/schemas/contactSchema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import axios, { isAxiosError } from "axios"
import { auth } from "@/services/apiUrl"
import { toast } from "sonner"


const CONTACT_METHODS = [
    { icon: Mail, contactMode: "Email Us", contactDetail: "support@nexustools.com", desc:"General enquiries and support", color: "#8b5cf6" },
    { icon: MessageCircleCodeIcon, contactMode: "Live Chat", contactDetail: "Available 9am - 6pm EST", desc:"Instant help from our team", color: "yellow"},
    { icon: Phone, contactMode: "Call Us", contactDetail: "+1 (555) 123-4567", desc:"Mon-Fri, 9am - 6pm EST", color: "#f59e0b"},
    { icon: Building2, contactMode: "Visit Our Office", contactDetail: "San Francisco, CA", desc:"Schedule an appointment", color: "#ec4899"},
]



export default function ContactPage(){
    const [loader, setLoader] = useState(false);

    const form  = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: ""
        }
    })

    const submitHandler = async (data: z.infer<typeof contactSchema>) => {
        setLoader(true);

        try{
            const response = await axios.post(auth.CONTACT_API, data);
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
            }

            form.reset();
        }
        catch(error: unknown){
            if(isAxiosError(error)){
                console.log("Something went wrong while sending message: ", error.response?.data);
                const toastId = toast(
                    "Something went wrong while sending message",
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
        <section className="relative py-24 px-5">
			<div className="max-w-6xl mx-auto">
                <Orb style={"w-[350px] h-[350px] bg-[#8b5cf6] top-[-10px] left-[-120px]"} />
                <Orb style={"w-[200px] h-[200px] bg-[#06b6d4] top-[200px] right-[20px]"} />

                {/* Grid Design */}
				<div className="absolute inset-0 opacity-5 pointer-events-none"
					style={{
						backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
						backgroundSize: "60px 60px",
					}}
				/>

				<SectionHeading 
                    badge="We're here to help" 
					title="Get in Touch" 
					sub="Have questions about our tools? Want to explore partnership opportunities? Our team is ready to connect, reach out and we'll respond within 24 hours."
                />

                <div className="relative py-[60px] px-6 overflow-hidden">
                    <div className="mx-auto max-w-[1000px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {
                            CONTACT_METHODS.map((method, i) => (
                                <ContactCard
                                    key={i}
                                    card={method}
                                />
                            ))
                        }
                    </div>
                </div>

                <SectionHeading 
                    badge="Send a message" 
					title="Drop Us a Line" 
					sub="Fill out the form below and our team will get back to you shortly."
                />

                <div className="p-7 md:p-10 bg-[rgba(18,18,32,0.72)] border border-[rgba(100,100,140,.13)] rounded-3xl backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,.25)]">
                    <div className="px-5 py-7 md:px-10 md:py-15 min-h-96 flex flex-col justify-center bg-[rgba(139,92,246,.04)] border-2 border-dashed border-[rgba(139,92,246,0.25)] rounded-2xl">
                        <h2 className="text-white text-3xl mb-4 font-['Cormorant_Garamond',serif]">
                            Send Us a Message
                        </h2>
                        <p className="text-[rgba(160,160,190,0.7)] text-sm font-['Cormorant_Garamond',serif]">
                            Fill out the form below and we'll get back to you as soon as possible. Fill out the form below and we'll get back to you as soon as possible.
                        </p>

                        {/* FORM */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(submitHandler)} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel className="text-[13px] text-[rgba(180,180,210,.78)]">Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John Doe"
                                                className="text-[14px] border-[rgba(100,100,140,.2)] text-white placeholder:text-white/40 focus-visible:ring-0"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Email */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel className="text-[13px] text-[rgba(180,180,210,.78)]">Email Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="you@example.com"
                                                className="bg-[rgba(18,18,32,0.6)] border-[rgba(100,100,140,.2)] text-white placeholder:text-white/40 focus-visible:ring-0"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Subject */}
                                <FormField
                                    control={form.control}
                                    name="subject"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel className="text-[13px] text-[rgba(180,180,210,.78)]">Subject</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Regarding tools issues"
                                                className="bg-[rgba(18,18,32,0.6)] border-[rgba(100,100,140,.2)] text-white placeholder:text-white/40 focus-visible:ring-0"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Message */}
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                        <FormLabel className="text-[13px] text-[rgba(180,180,210,.78)]">Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows={8}
                                                placeholder="Tell us how we can help you..."
                                                className="min-h-40 bg-[rgba(18,18,32,0.6)] border-[rgba(100,100,140,.2)] text-white placeholder:text-white/40 focus-visible:ring-0"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Submit */}
                                <div>
                                    <button
                                        type="submit"
                                        className="flex items-center gap-1 px-5 py-3 rounded-lg text-sm font-semibold text-white transition-all 
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
                                            ("Send Message")
                                        }
                                    </button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
			</div>
		</section>
    )
}