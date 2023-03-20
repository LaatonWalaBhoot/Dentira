import { FastifyInstance } from "fastify";
import store from "./search";

export default (app : FastifyInstance, prefix: string) => {
    app.register(store,{ prefix : prefix } );
}
