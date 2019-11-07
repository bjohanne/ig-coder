import environmentConfig from "./environmentConfig";

class Config {

    api: { baseUrl: string } = {
        baseUrl: "http://localhost:5000",
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
