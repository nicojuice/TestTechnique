import { TaskStatus } from "@/types";

export async function updateTaskStatus(id: string, status: TaskStatus): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const err = await res.json();
      return { success: false, error: err.error };
    }

    return { success: true };
  } catch (err) {
    console.error("Erreur réseau lors de la mise à jour du statut :", err);
    return { success: false, error: "Erreur réseau" };
  }
}
