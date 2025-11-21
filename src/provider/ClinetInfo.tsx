"use client";

import { useContext, useState, ReactNode, useEffect, createContext } from "react";
import Cookies from "js-cookie";
import { UserModel } from "@/api/type/models/user";
import { useRouter } from "next/navigation";

interface AuthContextType {
    token: string | null;
    user: UserModel | null;
    login: (userData: UserModel) => void;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;

}

const AuthContext = createContext<AuthContextType>({
    token: null,
    user: null,
    loading: true,
    login: () => { },
    logout: () => { },
    isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserModel | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadUser = () => {
            const storedToken = Cookies.get("token");
            const storedUser = Cookies.get("user");

            if (storedToken) setToken(storedToken);
            if (storedUser) setUser(JSON.parse(storedUser));
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = (userData: UserModel) => {
        setToken(userData.token);
        setUser(userData);

        Cookies.set("token", userData.token, { expires: 7 });
        Cookies.set("user", JSON.stringify(userData), { expires: 7 });
    };



    const logout = () => {
        setToken(null);
        Cookies.remove("token");
        Cookies.remove("user");
        router.push("/signin")
    };


    return (
        <AuthContext.Provider value={{ loading, token, user, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
