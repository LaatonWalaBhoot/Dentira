import {Product, StoreList} from "../data/model/response/CommonResponse";
import axios from "axios";

export default class ChromaService {

    async getResults(query: String) {
        const response = await axios.get(`https://api.croma.com/product/allchannels/v1/search?currentPage=0&query=${query}`);
        const results: Product[] = [];

        response.data.products.forEach((product: any) => {
            const title = product.name
            const image = product.plpImage
            const price = product.price.value

            results.push(<Product> { name: title, image: image, price: price })
        })

        return <StoreList> {"croma": results}
    }
}