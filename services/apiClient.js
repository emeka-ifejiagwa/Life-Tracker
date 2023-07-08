import axios from "axios";
const {API_BASE_URL} = require("../constants")

class ApiClient{
    constructor(remoteHostUrl){
        this.remoteHostUrl = remoteHostUrl
        this.token = null
    }
    
    setToken(token){
        this.token = token
    }

    
}

export default ApiClient
