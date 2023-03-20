import SearchController from "./SearchController";

import {
    flipkartService,
    amazonService,
    chromaService,
    relianceService
} from "../services"

const searchController = new SearchController(amazonService, flipkartService, chromaService, relianceService)

export {searchController}
