import BaseController from "./BaseController";
import AmazonService from "../services/AmazonService";
import FlipkartService from "../services/FlipkartService";
import ChromaService from "../services/ChromaService";
import RelianceService from "../services/RelianceService";
import {amazonService, chromaService, flipkartService, relianceService} from "../services";
import {FastifyReply} from "fastify";
import {SearchResponse, StoreList} from "../data/model/response/CommonResponse";
import _ from "lodash"

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
        if(_.isEmpty(query)) {
            return this.badRequest(res, "No search query specified")
        }

        return Promise.all([
            amazonService.getResults(query).catch(() => <StoreList>{}),
            flipkartService.getResults(query).catch(() => <StoreList>{}),
            chromaService.getResults(query).catch(() => <StoreList>{}),
            relianceService.getResults(query).catch(() => <StoreList>{})
        ]).then((results) => this.formatSearchResponse(results))
            .then(result => this.ok(res, result))
            .catch(err => this.fail(res, err))

    }

    private formatSearchResponse(storeList: StoreList[]) {
        const searchResponse = <SearchResponse>{results: <StoreList>{}}
        storeList.forEach(list => Object.assign(searchResponse.results, list))
        return searchResponse
    }
}
