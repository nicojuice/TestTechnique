const fastify = require('fastify')({ logger: true });
// const loginRoutes = require('./srcs/login.js');
// const fastifyCors = require('@fastify/cors');

// fastify.register(fastifyCors, {
//   origin: '*',
//   methods: ['GET', 'POST', 'OPTIONS']
// });

// fastify.register(loginRoutes, { prefix: '/api' })


const host = '0.0.0.0';
const port = 8080;

fastify.listen({ host, port }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log('\n\nServeur login en écoute sur :', address, '\n');
});