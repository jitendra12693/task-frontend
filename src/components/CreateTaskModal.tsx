
import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { dangerButton, error, formControl, successButton } from "../index.style";

type Form = { title: string; description?: string; priority?: string; assigneeId?: string, userId?: string };

export default function CreateTaskModal({ onClose, onCreated }: { onClose: () => void; onCreated: (t: any) => void; }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Form>();
  const { user } = useAuth();
  const submit = async (data: Form) => {
    try {
      data.assigneeId = user?.id;
      data.userId = user?.id;
      const res = await api.post("task/createTask", { ...data });
      onCreated(res.data);
      onClose();
    } catch (e) {
      alert("Create failed");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Create Task</h3>
        <form onSubmit={handleSubmit(submit)}>
          <table>
            <tr>
              <td style={{width:"30%"}}><label>Title</label></td>
              <td style={{width:"70%"}}><input className={formControl} {...register("title", { required: "Title is required" })} />
                {errors.title && <p className={error}>{errors.title.message}</p>}
              </td>
            </tr>
            <tr>
              <td><label>Description</label></td>
              <td><textarea className={formControl} {...register("description", { required: "Description is required." })} />
                {errors.description && <p className={error}>{errors.description.message}</p>}
              </td>
            </tr>
            <tr>
              <td><label>Priority</label></td>
              <td><select className={formControl} {...register("priority")}>
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
  );
}
