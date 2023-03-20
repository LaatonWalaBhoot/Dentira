import {Product, StoreList} from "../data/model/response/CommonResponse";
import axios from "axios";
import {load} from "cheerio";
import _ from "lodash"

export default class RelianceService {

    async getResults(query: String) {
        const response = await axios.get(`https://www.reliancedigital.in/rildigitalws/v2/rrldigital/products/suggestions?term=${query}`);
        let html = response.data;

        const redirectedResponse = await axios.get(`https://www.reliancedigital.in/${html.redirectUrlForTerm}`)
        html = redirectedResponse.data

        const $ = load(html);
        const results: Product[] = [];

        $('div.slick-slide').each((_idx, el) => {
            const listing = $(el)
            const title = listing.find('p.mss__slider__title').text()
            const image = listing.find('img').attr('src')
            const price = listing.find('p.priceboxw__mrp').text()

            if(!_.isEmpty(title)) {
                results.push(<Product> { name: title, image: image, price: price })
            }
        });

        return <StoreList> {"reliance_digital": results}
    }
}