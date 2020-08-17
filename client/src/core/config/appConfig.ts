import axios from "axios";

import environmentConfig from "./environmentConfig";

// BASIC CONFIG

class Config {
    api: { baseUrl: string } = {
        baseUrl: "http://localhost:5060",
    };

    client: { path: string } = {
        path: "/"
    };
}

const config = new Config();
let envName = process.env["REACT_APP_STAGE"];
let envConfig = environmentConfig[envName || "dev"];
Object.assign(config, envConfig);

export default config;

// AXIOS

axios.defaults.baseURL = config.api.baseUrl;
axios.defaults.timeout = 1000;
