import React, { use, useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import TaskColumn from "../components/TaskColumn";
import CreateTaskModal from "../components/CreateTaskModal";
import { buttonDefault, formControl, successButton } from "../index.style";
import { set } from "react-hook-form";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority?: string;
  assigneeId?: string | null;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const { logout, userList } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"" | "TODO" | "IN_PROGRESS" | "DONE">("");
  const [selectedUser, setSelectedUser] = useState<string>("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("task/getTasks");
      setTasks(res.data?.result || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // optional: setInterval(load, 5000) for polling or use WebSocket
  }, []);

  useEffect(() => {
    serverSideFiltering();
  }, [selectedStatus, selectedUser]);

  const onCreate = (t: any) => {
    setTasks((s) => [t?.result, ...s]);
  };

  const updateTask = (updated: Task) => {
    setTasks((s) => s.map((t) => (t.id === updated.id ? updated : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((s) => s.filter((t) => t.id !== id));
  };

  //const byStatus = (status: Task["status"]) => tasks.filter((t) => t.status === status);

  // filter tasks by status + search
  const byStatus = (status: Task["status"]) =>
    tasks?.filter(
      (t) =>
        t.status === status &&
        (t.title.toLowerCase().includes(search.toLowerCase()) ||
          (t.description ?? "").toLowerCase().includes(search.toLowerCase()))
  );

  const serverSideFiltering = async () => {
    setLoading(true);
    try {
      const res = await api.get("task/getTasks", {
        params: { status: selectedStatus || undefined , assignee: selectedUser || undefined },
      });
      setTasks(res.data?.result || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="dashboard">
      <header className="dash-head">
        <h2>Tasks</h2>
        <div>
          <input className={formControl}
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginRight: "10px", width: "40%" }}
          />
          <button className={successButton} onClick={() => setShowCreate(true)}>Create Task</button>
          <button className={buttonDefault} style={{ marginLeft: "5px" }} onClick={() => { logout(); window.location.href = "/login"; }}>Logout</button>
        </div>
      </header>
      <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
        {/* Status Filter */}
        <select
          className={formControl}
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value as "" | "TODO" | "IN_PROGRESS" | "DONE");
          }}
          style={{ minWidth: "120px" }}

        >
          <option value="">All Status</option>
          <option value="0">TODO</option>
          <option value="1">IN PROGRESS</option>
          <option value="2">DONE</option>
        </select>
        {/* User Filter */}
        <select
          className={formControl}
          value={selectedUser}
          onChange={(e) => {
            setSelectedUser(e.target.value);
          }}
          style={{ minWidth: "120px" }}

        >
          <option value="">All Users</option>
          {/* Populate with user list if available */}
          {userList.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>

      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="columns">
          <TaskColumn title="TODO" tasks={byStatus("TODO")} onUpdate={updateTask} onDelete={deleteTask} refresh={load} />
          <TaskColumn title="IN PROGRESS" tasks={byStatus("IN_PROGRESS")} onUpdate={updateTask} onDelete={deleteTask} refresh={load} />
          <TaskColumn title="DONE" tasks={byStatus("DONE")} onUpdate={updateTask} onDelete={deleteTask} refresh={load} />
        </div>
      )}

      {showCreate && <CreateTaskModal onClose={() => setShowCreate(false)} onCreated={onCreate} />}
    </div>
  );
}
