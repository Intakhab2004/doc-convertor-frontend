"use client"


import api from "@/services/apiUrl";
import { isAxiosError } from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner";


interface authContextType {
    isAuthenticated: boolean | undefined,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | undefined>>,
    logoutLoader: boolean,
    logout: () => void
}

const authContext = createContext<authContextType | null>(null);

export const AuthProvider = ({children, initialUser}: {children: React.ReactNode, initialUser: boolean | undefined}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(initialUser);
    const [logoutLoader, setLogoutLoader] = useState(false);

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
        <authContext.Provider value={{isAuthenticated, setIsAuthenticated, logout, logoutLoader}}>
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



