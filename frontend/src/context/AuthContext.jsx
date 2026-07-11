import { createContext, useState, useEffect } from "react";
import axios from "axios"

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try{
            const response = await axios.get(
                "https://sneakerhead-ecommerce-platform.onrender.com/api/auth/curr-user",
                {
                    withCredentials: true,
                }
            )
            setUser(response.data.user);
        }catch(err){
            setUser(null);
        }
    }

    const checkAdminAuth = async () => {
        try{
            const response = await axios.get(
                "https://sneakerhead-ecommerce-platform.onrender.com/api/auth/curr-admin",
                {
                    withCredentials: true,
                }
            )
            setAdmin(response.data.admin);
        }catch(err){
            setAdmin(null);
        }
    }

    return (
        <AuthContext.Provider value = {{
                user,
                setUser,
                checkAuth,

                admin,
                setAdmin,
                checkAdminAuth,
            }}>
            {children}
        </AuthContext.Provider>
    )
}