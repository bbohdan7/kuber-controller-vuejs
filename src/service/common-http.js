import axios from 'axios'

export default axios.create({
    baseURL: "http://192.168.0.137:9080/payment-processor/api",
    headers: {
        "Content-Type": "application/json"
    }
})

