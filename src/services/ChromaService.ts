import {Product, StoreList} from "../data/model/response/CommonResponse";
import axios from "axios";
import {load} from "cheerio";
import * as xml2js from 'xml2js';
import {chromaService} from "./index";

export default class ChromaService {

    async getResults(query: String) {
        return <StoreList> {

        }
    }
}