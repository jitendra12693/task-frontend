import React, { useState } from "react";
import api from "../api/axios";
import { TaskStatus } from "./TaskStatus";
import { useAuth } from "../context/AuthContext";
import { buttonDefault, dangerButton, formControl, primaryButton, successButton } from "../index.style";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority?: string;
  assigneeId?: string | null;
  assignee?: string;
};

export default function TaskCard({ task, onUpdate, onDelete, refresh }: { task: Task; onUpdate: (t: Task) => void; onDelete: (id: string) => void; refresh: () => void; }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const { userList } = useAuth();
  const [assigneeId, setAssigneeId] = useState(task.assigneeId || "");
  const [description, setDescription] = useState(task.description || "");
  const save = async () => {
    try {
      let body = {
        title, 
        description: description,
        priority: task.priority, 
        assigneeId: assigneeId, 
        id: task.id
      };
      const res = await api.put(`/task/updateTask/${task.id}`, body);
      res.data.result.assignee = userList.find(u => u.id === assigneeId)?.username || task.assignee;
      onUpdate(res.data?.result || { ...task, title, description, assigneeId });
      setEditing(false);
    } catch (e) {
      alert("Update failed");
    }
  };

  const advance = async () => {
    try {
      // simple state transition
      const next = task.status === "TODO" ? TaskStatus.IN_PROGRESS : task.status === "IN_PROGRESS" ? TaskStatus.DONE : TaskStatus.DONE;
      const res = await api.put(`/task/updateTask/${task.id}`, { ...task, status: next });
      
      onUpdate(res.data?.result || { ...task, status: next });
    } catch (e) {
      alert("Status update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete task?")) return;
    try {
      await api.delete(`/task/${task.id}`);
      onDelete(task.id);
    } catch (e) {
      alert("Delete failed");
    }
  };

  return (
    <div className="task-card">
      {editing ? (
        <>
          <input className={formControl} value={title} onChange={(e) => setTitle(e.target.value)} />
          <p><textarea className={formControl} value={description} onChange={(e) => setDescription(e.target.value)} /></p>
          <p>
            <select className={formControl} onChange={(e) => setAssigneeId(e.target.value)} value={assigneeId}>
              <option value="Select User">Select User</option>
              {userList.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </p>
          <div>
            <button onClick={save} className={successButton}>Save</button>
            <button onClick={() => setEditing(false)} className={dangerButton} >Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h4>{task.title} </h4>
          <h5>{task?.assignee}</h5>
          <p>{task.description}</p>
          <div className="card-actions">
            <button className={primaryButton} onClick={() => setEditing(true)}>Edit</button>
            <button className={buttonDefault} onClick={advance}>Change Status</button>
            <button className={dangerButton} onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}
