

import type { FastifyInstance } from 'fastify';

export enum TaskStatus {
  PENDING = 'pending',
  DONE = 'done',
}

type Task = {
  id: string; // correspond au titre
  title: string;
  description: string;
  status: TaskStatus;
};

const tasks: Task[] = []; // Stockage temporaire en mémoire

export async function taskRoutes(fastify: FastifyInstance) {
  fastify.post('/tasks', async (request, reply) => {
    const { title, description } = request.body as { title: string; description: string };

    if (!title || !description) {
      return reply.status(400).send({ error: 'Titre et description requis.' });
    }

    // Vérifie si une tâche avec le même titre existe déjà
    const existingTask = tasks.find(task => task.id === title);
    if (existingTask) {
      return reply.status(409).send({ error: 'Une tâche avec ce titre existe déjà.' });
    }

    const newTask: Task = {
      id: title,
      title,
      description,
      status: TaskStatus.PENDING, // statut initial
    };

    tasks.push(newTask);
    return reply.status(201).send({ message: 'Tâche enregistrée avec succès', task: newTask });
  });

  //METHODE GET
  fastify.get('/tasks', async () => {
    return tasks;
  });
  
  //METHODE DELETE
  fastify.delete('/tasks/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return reply.status(404).send({ error: `Tâche avec l'id '${id}' non trouvée.` });
    }

    tasks.splice(taskIndex, 1);

    return reply.status(200).send({ message: `Tâche avec l'id '${id}' supprimée.` });
  });
  
  
  //METHODE PATCH
  fastify.patch('/tasks/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { status } = request.body as { status: TaskStatus };

    if (!status || ![TaskStatus.PENDING, TaskStatus.DONE].includes(status)) {
      return reply.status(400).send({ error: "Statut invalide. Utilisez 'pending' ou 'done'." });
    }

    const task = tasks.find(task => task.id === id);

    if (!task) {
      return reply.status(404).send({ error: `Tâche avec l'id '${id}' non trouvée.` });
    }

    task.status = status;

    return reply.status(200).send({ message: `Statut mis à jour pour la tâche '${id}'.`, task });
  });
}
