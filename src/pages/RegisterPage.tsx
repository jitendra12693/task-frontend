import React from "react";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { error, formControl, successButton } from "../index.style";

type Form = { username: string; email?: string; password: string };

export default function RegisterPage() {
  const { register, handleSubmit,formState:{errors} } = useForm<Form>();
  const nav = useNavigate();
  const onSubmit = async (data: Form) => {
    try {
      var response = await api.post("/auth/register", { username: data.username, email: data.email, password: data.password, role: "USER" });
      if(response?.data?.statusCode !== 200){
        throw new Error(response?.data?.statusMessage || "Register failed");
      }
      alert("Registered. Please login.");
      nav("/login");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="auth-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input className={formControl} {...register("username", { required: "User name is required." })} />
        {errors.username && <p className={error}>{errors.username.message}</p>}
        <label>Email</label>
        <input className={formControl} {...register("email", { required: "Email is required" })} />
        {errors.email && <p className={error}>{errors.email.message}</p>}
        <label>Password</label>
        <input className={formControl} type="password" {...register("password", { required: "Password is required." })} />
        {errors.password && <p className={error}>{errors.password.message}</p>}
        <button className={successButton} type="submit">Register</button>
      </form>
    </div>
  );
}
