
const BASE_URL = "https://scaly-backend.herokuapp.com"


const usersAPI = 'users'
const productsAPI = 'products'
const ordersAPI = 'orders'

export const Access = 'Type 1000003'

export const SIGNIN_URL = `${BASE_URL}/${usersAPI}/signin/`
export const SIGNUP_URL = `${BASE_URL}/${usersAPI}/signup/`
export const AUTH_URL = `${BASE_URL}/${usersAPI}/authenticate/`
export const PROFILE_URL = `${BASE_URL}/${usersAPI}/profile/`

export const STORES_URL = `${BASE_URL}/${usersAPI}/stores/`
export const STORE_URL = `${BASE_URL}/${usersAPI}/store/`

export const PRODUCTS_URL = `${BASE_URL}/${productsAPI}/products/`
export const PRODUCT_URL = `${BASE_URL}/${productsAPI}/product/`

export const ALIMENTATIONS_URL = `${BASE_URL}/${productsAPI}/alimentations/`
export const ALIMENTATION_URL = `${BASE_URL}/${productsAPI}/alimentation/`

export const ORDERS_URL = `${BASE_URL}/${ordersAPI}/orders/`
export const ORDER_URL = `${BASE_URL}/${ordersAPI}/order/`
export const FULFILL_ORDER_URL = `${BASE_URL}/${ordersAPI}/fulfill-order/`


export const LOGO = 'https://res.cloudinary.com/dchmztvzz/image/upload/v1622214139/logos/logo_white-1_tiqf6r.png'