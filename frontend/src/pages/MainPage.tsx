import { useState, useEffect } from "react";
import TaskForm, { FormData } from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { fetchTasks, type Task } from "@/api/GetTasks";

export default function MainPage() {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch((err) => console.error("Erreur fetch tasks:", err));
  }, []);

  function handleSubmit(data: FormData) {
    alert(`Titre: ${data.title}\nDescription: ${data.description}`);
    setShowForm(false);
    // Optionnel : refresh ou update local state ici
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl flex flex-col items-center gap-4">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="rounded-xl bg-blue-600 px-6 py-3 text-white shadow hover:bg-blue-700 transition"
          >
            Ajouter une tâche
          </button>
        ) : (
          <TaskForm onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
        )}

        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}
