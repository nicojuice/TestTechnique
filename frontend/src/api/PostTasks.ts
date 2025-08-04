// api/tasks.ts

export type TaskPayload = {
  title: string;
  description: string;
};

export async function createTask(task: TaskPayload) {
  const response = await fetch("http://localhost:8080/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erreur serveur (${response.status}): ${errorText}`);
  }

  return response.json(); // ou juste return void si pas de contenu
}
