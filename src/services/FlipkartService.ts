import {Product, StoreList} from "../data/model/response/CommonResponse";
import axios from "axios";
import {load} from "cheerio";

export default class FlipkartService {

    async getResults(query: String) {
        const response = await axios.get(`https://www.flipkart.com/search?q=${query}&marketplace=FLIPKART`);

        const html = response.data;
        const $ = load(html);

        const results: Product[] = [];

        $('div._2kHMtA').each((_idx, el) => {
            const listing = $(el)
            const title = listing.find('div._4rR01T').text()
            const image = listing.find('img._396cs4').attr('src')
            const price = listing.find('div._30jeq3._1_WHN1').text()

            results.push(<Product> { name: title, image: image, price: price })
        });

        return <StoreList> { "flipkart": results }
    }
}