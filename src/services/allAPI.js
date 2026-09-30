import apiServices from '../api/apiServices'


// ==================== Guest Home ====================

export const getAllProductsAPI = async () => {
    return await apiServices('GET', '/products', {})
}

export const getAllCategoriesAPI = async () => {
    return await apiServices('GET', '/categories', {})
}


// ==================== Guest Login & Register ====================

export const getUserByEmailAPI = async (email) => {
    return await apiServices('GET', `/users?email=${email}`, {})
}

export const registerUserAPI = async (userData) => {
    return await apiServices('POST', '/users', userData)
}

export const loginUserAPI = async (email, password) => {
    return await apiServices(
        'GET',
        `/users?email=${email}&password=${password}`,
        {}
    )
}


// ==================== Guest Cart / User Checkout ====================

export const addOrderAPI = async (orderData) => {
    return await apiServices('POST', '/orders', orderData)
}


// ==================== User Orders ====================

export const getUserOrdersAPI = async (userId) => {
    return await apiServices('GET', `/orders?userId=${userId}`, {})
}


// ==================== Admin Products ====================

export const addProductAPI = async (productData) => {
    return await apiServices('POST', '/products', productData)
}

export const updateProductAPI = async (id, productData) => {
    return await apiServices('PUT', `/products/${id}`, productData)
}

export const deleteProductAPI = async (id) => {
    return await apiServices('DELETE', `/products/${id}`, {})
}


// ==================== Admin Orders ====================

export const getAllOrdersAPI = async () => {
    return await apiServices('GET', '/orders', {})
}

export const updateOrderAPI = async (id, orderData) => {
    return await apiServices('PATCH', `/orders/${id}`, orderData)
}


// ==================== Admin Users ====================

export const getAllUsersAPI = async () => {
    return await apiServices('GET', '/users', {})
}

export const updateUserAPI = async (id, userData) => {
    return await apiServices('PATCH', `/users/${id}`, userData)
}

export const deleteUserAPI = async (id) => {
    return await apiServices('DELETE', `/users/${id}`, {})
}