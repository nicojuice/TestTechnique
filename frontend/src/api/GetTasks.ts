
export type Task = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "done";
};

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch("http://localhost:8080/api/tasks");
  if (!res.ok) {
    throw new Error(`Erreur HTTP ${res.status}`);
  }
  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("Données reçues invalides");
  }
  return data;
}
