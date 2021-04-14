import environmentConfig from "./environmentConfig";

// URLs for API and client

class URLConfig {
    api: { baseUrl: string } = {            // Base URl of the server API
        baseUrl: "http://localhost:5060/v1" // Default value - will be overwritten by environmentConfig value
    };

    client: { path: string } = {    // Base path of the client
        path: "/"                   // Default value - will be overwritten by environmentConfig value
    };
}

const urlConfig = new URLConfig();
let envName = process.env["REACT_APP_STAGE"];
let envConfig = environmentConfig[envName || "dev"];
Object.assign(urlConfig, envConfig);   // Overwrite objects api and client based on the current environment

export default urlConfig;
