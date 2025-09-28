
import { set, useForm } from "react-hook-form";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { dangerButton, error, formControl, successButton } from "../index.style";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import Loader from "./Loader";

type Form = { title: string; description?: string; priority?: string; assigneeId?: string, userId?: string };

export default function CreateTaskModal({ onClose, onCreated }: { onClose: () => void; onCreated: (t: any) => void; }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Form>();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (data: Form) => {
    try {
      const toastId = "sdadghdsjdjsjdf"; // Unique ID for this toast
      //toast.loading("Creating task...", { toastId, autoClose: false });

      setIsLoading(true);
      data.assigneeId = user?.id;
      data.userId = user?.id;
      const res = await api.post("task/createTask", { ...data });
      onCreated(res.data);
      onClose();
      // Update toast to success
      //toast.success("✅ Task created successfully.");
    } catch (e) {
      toast.error("Failed to create task. " + (e as any)?.response?.data?.message || (e as any)?.message || "");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
      {isLoading ? (
        <div className="modal-backdrop"><Loader /></div>
      ) : (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Create Task</h3>
            <form onSubmit={handleSubmit(submit)}>
              <table>
                <tr>
                  <td style={{ width: "30%" }}><label>Title</label></td>
                  <td style={{ width: "70%" }}>
                    <input className={formControl} {...register("title", { required: "Title is required" })} />
                    {errors.title && <p className={error}>{errors.title.message}</p>}
                  </td>
                </tr>
                <tr>
                  <td><label>Description</label></td>
                  <td>
                    <textarea className={formControl} {...register("description", { required: "Description is required." })} />
                    {errors.description && <p className={error}>{errors.description.message}</p>}
                  </td>
                </tr>
                <tr>
                  <td><label>Priority</label></td>
                  <td>
                    <select className={formControl} {...register("priority")}>
                      <option value="LOW">LOW</option>
                      <option value="MEDIUM">MEDIUM</option>
                      <option value="HIGH">HIGH</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <button type="submit" className={successButton}>Create</button>
                    <button type="button" className={dangerButton} onClick={onClose}>Cancel</button>
                  </td>
                </tr>
              </table>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
