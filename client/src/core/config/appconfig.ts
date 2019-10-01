import environmentconfig from "./environmentconfig";

class Config  {
    api: any = { 
        baseUrl: "http://localhost/"
    }
}

const config = new Config();
let envName = process.env["REACT_APP_STAGE"];
let envConfig = environmentconfig[envName || "dev"];
Object.assign(config, envConfig)
export default config;
