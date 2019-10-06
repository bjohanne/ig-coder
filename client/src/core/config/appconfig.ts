import environmentconfig from "./environmentconfig";

class Config  {

    api: { baseUrl: string } = { 
        baseUrl: "http://localhost",        
    }

    client: { path: string } = {
        path: "/"
    }

}

const config = new Config();
let envName = process.env["REACT_APP_STAGE"];
let envConfig = environmentconfig[envName || "dev"];
Object.assign(config, envConfig)
export default config;
