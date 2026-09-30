import axios from 'axios'

const axiousInstance = axios.create({
    baseURL: 'http://localhost:4444',
    timeout: 5000
})

axiousInstance.interceptors.response.use(
    (response) => {
        console.log('API response received!!!')
        return response
    },
    (error) => {
        if (error.response) {
            const status = error.response.status
            console.log(`API Error: ${status}`)
        } else if (error.request) {
            console.log('API server is not responding!!!')
        } else {
            console.log('API request error:', error.message)
        }

        return Promise.reject(error)
    }
)

export default axiousInstance