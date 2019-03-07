// import storageService from './storage-service.js';
// const BUGS_KEY = 'bugs';

export default {
    signUp: signUp,
    login: login,
    logOut: logOut,
    getLoggedInUser: getLoggedInUser
}

var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

function signUp(user) {
    var api = `http://127.0.0.1:3000/api/signup`;
    return axios.post(api, user)
        .then(res => res.data);

}

function login(user) {
    var api = `http://127.0.0.1:3000/api/login`;
    return axios.post(api, user)
        .then(res => {
            loggedInUser = res.data;
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
            return res.data;
        });
}

function logOut() {
    var api = `http://127.0.0.1:3000/api/logout`;
    return axios.get(api).then(res => {
        localStorage.removeItem('loggedInUser')
        loggedInUser = null;
        return res.data;
    });
}

function getLoggedInUser() {
    return loggedInUser;
}


