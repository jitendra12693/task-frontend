
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskCard from "./TaskCard";


type Task = {
  id: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority?: string;
  assigneeId?: string | null;
};

export default function TaskColumn({
  title,
  tasks,
  onUpdate,
  onDelete,
  refresh,
}: {
  title: string;
  tasks: Task[];
  onUpdate: (t: Task) => void;
  onDelete: (id: string) => void;
  refresh: () => void;
}) {

  

  // Call handleAsyncError for demonstration (remove or replace in real usage)
  // React.useEffect(() => { handleAsyncError(); }, []);

  return (
    <div className="column">
      <ToastContainer position="top-right" autoClose={3000} />
      <h3>{title}</h3>
      {tasks.length === 0 ? (
        <p className="no-task">No tasks available</p>
      ) : (
        tasks.map((t) => (
          <TaskCard
            key={t.id}
            task={t}
            onUpdate={onUpdate}
            onDelete={onDelete}
            refresh={refresh}
          />
        ))
      )}
    </div>
  );
}
