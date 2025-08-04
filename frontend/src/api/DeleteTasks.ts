export async function deleteTask(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const err = await res.json();
      return { success: false, error: err.error };
    }

    return { success: true };
  } catch (err) {
    console.error("Erreur réseau lors de la suppression :", err);
    return { success: false, error: "Erreur réseau" };
  }
}
