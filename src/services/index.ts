import FlipkartService from "./FlipkartService"
import AmazonService from "./AmazonService"
import RelianceService from "./RelianceService"
import ChromaService from "./ChromaService"


const flipkartService = new FlipkartService()
const amazonService = new AmazonService()
const relianceService = new RelianceService()
const chromaService = new ChromaService()

export {
    flipkartService,
    amazonService,
    relianceService,
    chromaService
}

