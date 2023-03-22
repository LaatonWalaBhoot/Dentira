import FlipkartService from "./FlipkartService"
import AmazonService from "./AmazonService"
import RelianceService from "./RelianceService"
import ChromaService from "./ChromaService"
import {axiosInstance} from "../data/http/client";


const flipkartService = new FlipkartService(axiosInstance)
const amazonService = new AmazonService(axiosInstance)
const relianceService = new RelianceService(axiosInstance)
const chromaService = new ChromaService(axiosInstance)

export {
    flipkartService,
    amazonService,
    relianceService,
    chromaService
}

