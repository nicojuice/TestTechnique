// components/TaskForm.tsx

import { useForm } from "react-hook-form";
import { createTask, TaskPayload } from "@/api/PostTasks";

type TaskFormProps = {
  onCancel: () => void;
};

export default function TaskForm({ onCancel }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskPayload>();

  const handleFormSubmit = async (data: TaskPayload) => {
    try {
      await createTask(data);
      alert("✅ Tâche ajoutée avec succès !");
      reset();
      onCancel();
    } catch (error: any) {
      console.error("Erreur d'envoi :", error);
      alert("❌ Échec lors de l'ajout de la tâche.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow"
    >
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
        <input
          id="title"
          {...register("title", { required: "Le titre est requis" })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          {...register("description", { required: "La description est requise" })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          rows={4}
        />
        {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-gray-300 px-4 py-2 hover:bg-gray-400"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Envoyer
        </button>
      </div>
    </form>
  );
}
