
export default function authHeader() {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.access_token) {
            return { Authorization: 'Token ' + user.access_token }
        } else {
            return {};
        } 
    } catch(error) {
        return {}
    }
}