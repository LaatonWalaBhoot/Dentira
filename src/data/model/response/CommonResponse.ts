export interface SearchResponse {
    results: StoreList
}

export interface StoreList {
    [key: string]: Product[]
}

export interface Product {
    name: string,
    image: string,
    price: string
}