import axios from "axios";

import authHeader from "./auth-header"
import { 
    ORDERS_URL,
    ORDER_URL,
    FULFILL_ORDER_URL,
    Access 
} from "../constants"


const getOrders = (store) => {
    return axios
        .post(ORDERS_URL, {store, Access}, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
}

const getOrder = (order) => {
    return axios
        .post(ORDER_URL, {order, Access}, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
}

const fulfillOrder = (orders, fulfillement) => {
    return axios
        .post(FULFILL_ORDER_URL, {orders, fulfillement, Access}, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
}

export default {
    getOrders,
    getOrder,
    fulfillOrder
}