import Fastify from 'fastify';
import cors from '@fastify/cors';
import { taskRoutes } from './routes/tasks.js';

const fastify = Fastify({ logger: true });

const host = '0.0.0.0';
const port = 8080;

async function start() {
  try {
    await fastify.register(cors, {
      origin: '*',
      methods: ['GET', 'POST', 'OPTIONS','DELETE', 'PATCH']
    });

    await fastify.register(taskRoutes, { prefix: '/api' });

    await fastify.listen({ host, port });
    console.log(`✅ Serveur lancé sur http://${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
