import environmentConfig from "./environmentConfig";

class Config {
    api: { baseUrl: string } = {
        baseUrl: "http://localhost:5060",
    };

    client: { path: string } = {
        path: "/"
    };
}

export const firebaseConfig = {
    apiKey: "AIzaSyDp4mEwWmkLs2Q1cd9Tce_Totro0rw3nBI",
    authDomain: "ig-coder.firebaseapp.com",
    databaseURL: "https://ig-coder.firebaseio.com",
    projectId: "ig-coder",
    storageBucket: "ig-coder.appspot.com",
    messagingSenderId: "507408162734",
    appId: "1:507408162734:web:b162fb711b68a2f22f323f",
    measurementId: "G-4LEBSV6YQH"
};

const config = new Config();
let envName = process.env["REACT_APP_STAGE"];
let envConfig = environmentConfig[envName || "dev"];
Object.assign(config, envConfig);

export default config;
