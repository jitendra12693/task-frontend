import React from "react";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { error, formControl, successButton } from "../index.style";

type Form = { username: string; password: string };

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<Form>();
  const { login } = useAuth();
  const nav = useNavigate();
  const onSubmit = async (data: Form) => {
    try {
      const res = await api.post("/auth/login", data);
      if(res?.data?.statusCode !== 200){
        throw new Error(res?.data?.statusMessage || "Login failed");
      }
      // Extract data from token (assuming JWT)
      const token = res.data.result || res.data?.result;
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log("Token payload:", payload);
        const user = {
          id: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
          email: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
          name: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
          role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        };
        // You can use payload data as needed
      }
      login(res.data.result || res.data.result || res.data); // some backend formats
      nav("/dashboard");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input className={formControl} {...register("username", { required: "User name is required." })} />
        {errors.username && <p className={error}>{errors.username.message}</p>}
        <label>Password</label>
        <input className={formControl} type="password" {...register("password", { required: "Password is required" })} />
        {errors.password && <p className={error}>{errors.password.message}</p>}
        <button className={successButton} type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
