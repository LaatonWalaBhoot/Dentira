import BaseController from "./BaseController";
import AmazonService from "../services/AmazonService";
import FlipkartService from "../services/FlipkartService";
import ChromaService from "../services/ChromaService";
import RelianceService from "../services/RelianceService";
import {amazonService, chromaService, flipkartService, relianceService} from "../services";
import {FastifyReply} from "fastify";

export default class SearchController extends BaseController {

    private amazonService: AmazonService
    private flipkartService: FlipkartService
    private chromaService: ChromaService
    private relianceService: RelianceService

    constructor(
        amazonService: AmazonService,
        flipkartService: FlipkartService,
        chromaService: ChromaService,
        relianceService: RelianceService,
    ) {
        super();
        this.amazonService = amazonService;
        this.relianceService = relianceService;
        this.chromaService = chromaService;
        this.flipkartService = flipkartService;
    }

    public async getSearchResults(query: String, res: FastifyReply) {
        return Promise.all([
            amazonService.getResults(query),
            flipkartService.getResults(query),
            chromaService.getResults(query),
            relianceService.getResults(query)
        ]).then((results) => this.formatSearchResponse())
            .then(result => this.ok(res, result))
            .catch(err => this.fail(res, err))

    }

    private formatSearchResponse() {

    }
}
