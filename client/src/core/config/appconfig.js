import environmentconfig from "./environmentconfig";

class Config  {
    api: { 
        baseUrl: "http://localhost/"
    }    
}

const config = new Config();
 
Object.assign(config, environmentconfig[process.env.REACT_APP_STAGE])
export default config;
