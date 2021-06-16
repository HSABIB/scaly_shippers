import axios from "axios";

import authHeader from "./auth-header"
import { SIGNIN_URL, AUTH_URL, Access } from "../constants"



const signin = (username, password) => {
    return axios
        .post(SIGNIN_URL, {username, password, Access})
        .then((response) => {
            if (response.data.response_code === 0) {
                localStorage.setItem("user", JSON.stringify({
                    access_token: response.data.access_token,
                    refresh_token: response.data.refresh_token,
                }));
            }
            return response.data;
        });
}

const signout = () => {
    localStorage.removeItem("user");
    window.location.href='/auth/signin'
}

const getAuthentification = async () => {
    await axios.post(AUTH_URL, {Access} ,{ headers: authHeader() })
    .then( response => response.data)
    .then( data => {
        if ( data.response_code !== 0 ) {
            signout()
        }
    })
    return true
}

export default {
    signin,
    signout,
    getAuthentification
};