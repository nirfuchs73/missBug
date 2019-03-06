
module.exports = {
    getUsers
}

var users = [{fullName: 'David Ben Tsruya'}, {fullName: 'Puki Ben David'}];
function getUsers() {
    return Promise.resolve(users);
}
