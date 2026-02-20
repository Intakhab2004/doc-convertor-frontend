"use client"


import api from "@/services/apiUrl";
import axios, { isAxiosError } from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner";


interface authContextType {
    isAuthenticated: boolean,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    loader: boolean,
    logoutLoader: boolean,
    logout: () => void
}

const authContext = createContext<authContextType | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loader, setLoader] = useState(false);
    const [logoutLoader, setLogoutLoader] = useState(false);

    useEffect(() => {
        const checkAuthentication = async() => {
            try{
                setLoader(true);

                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/refresh-token`, {}, {withCredentials: true});
                if(res.data.success){
                    setIsAuthenticated(true);
                }
            }
            catch(error: unknown){
                console.log("Something went wrong: ", error);
                setIsAuthenticated(false);
            }
            finally{
                setLoader(false);
            }
        }

        checkAuthentication();
    }, [])

    const logout = async() => {
        setLogoutLoader(true);

        try{
            const response = await api.post("/user/logout");
            if(response.data.success){
                localStorage.removeItem("accessToken");
                setIsAuthenticated(false);

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
        }
        catch(error: unknown){
            if(isAxiosError(error)){
                console.log("Something went wrong while logout: ", error.response?.data);
                const toastId = toast(
                    "Something went wrong while logout",
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
        }
        finally{
            setLogoutLoader(false);
        }
    }


    return (
        <authContext.Provider value={{isAuthenticated, setIsAuthenticated, loader, logout, logoutLoader}}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(authContext);
    if(!context){
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
}



