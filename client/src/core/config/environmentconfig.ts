const environments: any = {
    dev: { 
        api: {
            baseUrl: "http://localhost:5000"
        }
    },
    test: {
        api: {
            baseUrl: "http://10.212.137.212"
        }
    },  
    prod: {
        api: {
            baseUrl: "http://unknown/"
        }
    }
}

export default environments;