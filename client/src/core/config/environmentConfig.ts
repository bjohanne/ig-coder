const environments: any = {
    dev: {
        api: {
            baseUrl: "http://localhost:5060",
        },
        client: {
            path: ""
        }
    },
    test: {
        api: {
            baseUrl: "http://10.212.137.212/server"
        },
        client: {
            path: ""
        }
    },
    prod: {
        api: {
            baseUrl: "http://unknown",
        },
        client: {
            path: "igcoder"
        }
    }
};

export default environments;
