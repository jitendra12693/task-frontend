import React, { createContext, useContext, useState, useEffect } from "react";

import { saveToken, getToken, logout as clearToken } from "../context/authStorage";
import api from "../api/axios";
import { set } from "react-hook-form";

type AuthContextType = {
    token?: string | null;
    login: (token: string) => void;
    logout: () => void;
    user?: any;
    userList: any[];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(getToken());
    const [userList, setUserList] = useState<any[]>([]);
    useEffect(() => {
        setToken(getToken());
    }, []);

    useEffect(() => {
        if (token) {
            api.get("auth/users").then(res => {
                setUserList(res.data?.result || []);
            }).catch(e => {
                console.error("Failed to fetch user list", e);
            });
        } else {
            setUserList([]);
        }
    }, [token]);

    const login = (t: string) => {
        saveToken(t);
        setToken(t);
    };
    const logout = () => {
        clearToken();
        setToken(null);
    };
    if(!token) {
        return <AuthContext.Provider value={{ token, login, logout, user: undefined,userList }}>{children}</AuthContext.Provider>;
    }
    const payload = JSON.parse(atob(token?.split('.')[1]||"{}"));
    
    const user = {
        id: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        email: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        name: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    };
    console.log("Token payload:", user);
    //const user = token ? { name: "Demo User" } : undefined; // replace with real user fetch if needed

    return <AuthContext.Provider value={{ token, login, logout, user,userList }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
