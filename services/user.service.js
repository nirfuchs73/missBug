const fs = require('fs');

module.exports = {
    query,
    add,
    checkLogin,
    checkSignup
}

var users = require('../data/users.json');

function query() {
    return Promise.resolve(users);
}

function add(user) {
    user._id = _makeId()
    users.push(user)
    return _saveUsersToFile().then(() => user)
}

function _makeId(length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveUsersToFile() {
    return new Promise((resolve, reject) => {
        var strUsers = JSON.stringify(users)
        fs.writeFile("data/users.json", strUsers, (err) => {
            if (err) {
                console.error('Had problem writing to users file', err);
                reject(err);
            } else resolve();
        });
    })
}

function checkLogin(userName, password) {
    var user = users.find((user) => {
        return user.userName === userName && user.password === password;
    });
    if (user) {
        var userToReturn = { ...user };
        delete userToReturn.pass;
        return Promise.resolve(userToReturn);
    }
    else {
        return Promise.reject('Wrong user');
    }
}

function checkSignup(userName) {
    var user = users.find((user) => {
        return user.userName === userName;
    });
    if (user) {
        console.log('checkSignup - User already exist');
        return Promise.reject('User already exist');
    } else {
        return Promise.resolve();
    }
}

