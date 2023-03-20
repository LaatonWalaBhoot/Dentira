import {FastifyInstance, FastifyPluginOptions} from "fastify";
import {SearchRequest} from "../../data/model/request/CommonRequest";
import {searchController} from "../../controllers";

export default (fastify: FastifyInstance,options: FastifyPluginOptions, done: Function) => {

    fastify.get<{ Querystring: SearchRequest }>(
        "/search",
        async (request, reply) => {
            const {q} = request.query;
            return await searchController.getSearchResults(q)
        })

    done()
}