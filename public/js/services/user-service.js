// import storageService from './storage-service.js';

export default {
    signUp: signUp,
    login: login,
    logOut: logOut,
    getLoggedInUser: getLoggedInUser,
    query: query,
    deleteUser: deleteUser,
    getBugById: getBugById
}
var users = [];

var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

function signUp(user) {
    var api = `http://127.0.0.1:3000/api/signup`;
    return axios.post(api, user)
        .then(res => {
            loggedInUser = res.data;
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
            return res.data;
        });

}

function login(user) {
    var api = `http://127.0.0.1:3000/api/login`;
    return axios.post(api, user)
        .then(res => {
            loggedInUser = res.data;
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
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

function query() {
    var api = `http://127.0.0.1:3000/api/user`;
    return axios.get(api)
        .then(res => res.data)
        .then(loadedUsers => {
            users = loadedUsers;
            return users;
        });
}

function deleteUser(userId) {
    var api = `http://127.0.0.1:3000/api/user/${userId}`;
    return axios.delete(api)
        .then(res => res.data)
        .then(() => {
            const idx = users.findIndex(user => user._id === userId);
            users.splice(idx, 1);
        });
}

function getBugById(userId) {
    var api = `http://127.0.0.1:3000/api/user/${userId}`;
    return axios.get(api)
        .then(res => res.data);
}


