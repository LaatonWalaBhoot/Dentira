import {Product, StoreList} from "../data/model/response/CommonResponse";
import {load} from "cheerio"
import axios from "axios"

export default class AmazonService {

    async getResults(query: String) {
        const response = await axios.get(`https://www.amazon.com/s?k=${query}&crid=2TI42LNY7WIN1&ref=nb_sb_noss_2`);

        const html = response.data;
        const $ = load(html);

        const results: Product[] = [];

        $('div.sg-col-20-of-24.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20.sg-col.s-widget-spacing-small.sg-col-12-of-16').each((_idx, el) => {
            const listing = $(el)
            const title = listing.find('span.a-size-medium.a-color-base.a-text-normal').text()
            const image = listing.find('img.s-image').attr('src')
            const price = listing.find('span.a-price > span.a-offscreen').text()

            results.push(<Product> { name: title, image: image, price: price })
        });

        return <StoreList> {"amazon": results}
    }
}