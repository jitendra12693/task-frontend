import React from "react";
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
  return (
    <div className="column">
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
