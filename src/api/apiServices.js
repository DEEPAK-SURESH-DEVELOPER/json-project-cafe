import axiousInstance from './axiousInstance'

const apiServices = async (httpMethod, url, reqBody) => {
    return await axiousInstance({
        method: httpMethod,
        url: url,
        data: reqBody
    })
}

export default apiServices