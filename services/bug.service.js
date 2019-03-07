const fs = require('fs');


module.exports = {
    query,
    getById,
    remove,
    add,
    update
}

// var bugs = _createBugs();
var bugs = require('../data/bugs.json');

function query() {
    return Promise.resolve(bugs);
}

function add(bug, creator) {
    bug._id = _makeId();
    bug.creator = { name: creator, id: 'abc' }
    bugs.push(bug)
    return _saveBugsToFile().then(() => bug)
}

function update(bug) {
    var bugIdx = bugs.findIndex(currBug => currBug.id === bug._id);
    bugs.splice(bugIdx, 1, bug)
    return _saveBugsToFile().then(() => bug)
    // return Promise.resolve(bug)
}

function getById(id) {
    var bug = bugs.find(bug => bug._id === id);
    if (bug) return Promise.resolve(bug);
    else return Promise.reject('Unknown Bug');
}

function remove(bugId) {
    var bugIdx = bugs.findIndex(bug => bug._id === bugId);
    if (bugIdx === -1) return Promise.reject('Not Found');
    bugs.splice(bugIdx, 1)
    return _saveBugsToFile();
}

function _makeId(length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveBugsToFile() {
    return new Promise((resolve, reject) => {
        var strBugs = JSON.stringify(bugs)
        fs.writeFile("data/bugs.json", strBugs, (err) => {
            if (err) {
                console.error('Had problem writing to bugs file', err);
                reject(err);
            } else resolve();
        });
    })
}

// function _createBugs() {
//     return ['Do the Stuff', 'Eat the Lunch'].map(_createBug)
// }

// function _createBug(txt) {
//     return {
//         id: _makeId(),
//         txt,
//         isDone: false,
//         importance: 1,
//     }
// }