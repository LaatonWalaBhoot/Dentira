import fastify from 'fastify';

// Initialising fastify app with config
const app = fastify({
    logger: {
        level: 'info',
        redact: ['err.config'],
    },
    requestIdHeader: "x-request-id",
    requestIdLogLabel: "requestId",
})

// switching from console.log to context logging
if (console.log) console.log = (...args) => app.log.info(args)
if (console.error) console.error = (...args) => app.log.error(args)


// Healthiness probe
app.get("/health", (_, reply) => reply.send("Welcome to the Store...."));

//IIFE to decorate request with context and start server
(async () => {
    await app.listen({port: 8080, host: "0.0.0.0"});
    await app.ready()
})();





