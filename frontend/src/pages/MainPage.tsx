import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  description: string;
};

export default function MainPage() {
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  function onSubmit(data: FormData) {
    alert(`Titre: ${data.title}\nDescription: ${data.description}`);
    reset();
    setShowForm(false);
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl flex flex-col items-center">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="rounded-xl bg-blue-600 px-6 py-3 text-white shadow hover:bg-blue-700 transition"
          >
            Remplir le formulaire
          </button>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow">
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
                onClick={() => setShowForm(false)}
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
        )}
      </div>
    </div>
  );
}

