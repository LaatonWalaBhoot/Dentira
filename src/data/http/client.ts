import axios from "axios";
import http from "http";
import https from "https";

const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });

const axiosInstance = axios.create({
  timeout: 5000,
  httpAgent,
  httpsAgent,
  headers: {
    'User-Agent': 'xyz'
  }
});

export { axiosInstance };
