import axios from "axios";

import authHeader from "./auth-header"
import { STORES_URL, STORE_URL, Access } from "../constants"


const getStores = () => {
    return axios
        .post(STORES_URL, {Access}, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
}

export default {
    getStores,
}