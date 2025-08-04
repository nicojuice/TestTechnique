// import { deleteTask } from "@/api/DeleteTasks";
// import type { Task } from "@/api/GetTasks";
// import ToggleSwitch from "./ToggleSwitch";

// type TaskListProps = {
//   tasks: Task[];
//   setTasks: (tasks: Task[]) => void;
// };

// export default function TaskList({ tasks, setTasks }: TaskListProps) {
//   async function handleDelete(id: string) {
//     const result = await deleteTask(id);
//     if (!result.success) {
//       console.error("Erreur suppression tâche :", result.error);
//       return;
//     }

//     setTasks(tasks.filter((task) => task.id !== id));
//   }

//   function handleToggleStatus(id: string) {
//     const updatedTasks = tasks.map((task) =>
//       task.id === id
//         ? { ...task, status: task.status === "done" ? "todo" : "done" }
//         : task
//     );

//     setTasks(updatedTasks);
//   }

//   return (
//     <ul className="w-full mt-6 space-y-2">
//       {tasks.map((task) => (
//         <li
//           key={task.id}
//           className="relative rounded border p-4 shadow-sm bg-white flex flex-col gap-2"
//         >
//           {/* Bouton de suppression */}
//           <button
//             onClick={() => handleDelete(task.id)}
//             className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
//             aria-label="Supprimer la tâche"
//           >
//             ❌
//           </button>

//           <div className="font-semibold">{task.title}</div>
//           <div className="text-sm text-gray-700">{task.description}</div>

//           <div className="flex items-center justify-between">
//             <span
//               className={`text-xs font-medium ${
//                 task.status === "done" ? "text-green-600" : "text-yellow-600"
//               }`}
//             >
//               {task.status}
//             </span>

//             {/* Toggle Switch importé */}
//             <ToggleSwitch
//               checked={task.status === "done"}
//               onChange={() => handleToggleStatus(task.id)}
//             />
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }

import { deleteTask } from "@/api/DeleteTasks";
import { updateTaskStatus } from "@/api/PatchTasks";
import type { Task } from "@/api/GetTasks";
import ToggleSwitch from "./ToggleSwitch";

type TaskListProps = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
};

export default function TaskList({ tasks, setTasks }: TaskListProps) {
  async function handleDelete(id: string) {
    const result = await deleteTask(id);
    if (!result.success) {
      console.error("Erreur suppression tâche :", result.error);
      return;
    }

    setTasks(tasks.filter((task) => task.id !== id));
  }

  async function handleToggleStatus(id: string, currentStatus: Task["status"]) {
    const newStatus = currentStatus === "done" ? "pending" : "done";

    const result = await updateTaskStatus(id, newStatus);
    if (!result.success) {
      console.error("Erreur mise à jour statut :", result.error);
      return;
    }

    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );

    setTasks(updatedTasks);
  }

  return (
    <ul className="w-full mt-6 space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="relative rounded border p-4 shadow-sm bg-white flex flex-col gap-2"
        >
          <button
            onClick={() => handleDelete(task.id)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
            aria-label="Supprimer la tâche"
          >
            ❌
          </button>

          <div className="font-semibold">{task.title}</div>
          <div className="text-sm text-gray-700">{task.description}</div>

          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-medium ${
                task.status === "done" ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {task.status}
            </span>

            <ToggleSwitch
              checked={task.status === "done"}
              onChange={() => handleToggleStatus(task.id, task.status)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
