// import storageService from './storage-service.js';
// const BUGS_KEY = 'bugs';

export default {
    query: query,
    deleteBug: deleteBug,
    login,
    getBugById: getBugById,
    addBug: addBug
}
var bugs = [];


function query() {
    var api = 'http://127.0.0.1:3000/api/bug';
    return axios.get(api)
        .then(res => {
            bugs = res.data;
            return bugs;
        });
}

function deleteBug(bugId) {
    var api = `http://127.0.0.1:3000/api/bug/${bugId}`;
    return axios.delete(api)
        .then(res => res.data)
        .then(() => {
            const idx = bugs.findIndex(bug => bug._id === bugId);
            bugs.splice(idx, 1);
        });
}


function addBug(bugObj) {
    var api = `http://127.0.0.1:3000/api/bug`;
    return axios.post(api, bugObj).then(res => res.data);
}

function getBugById(bugId) {
    var bug = gBugs.find(function (bug) {
        return bugId === bug.id
    })
    return Promise.resolve(bug);
}

function login(userObj) {
    var api = `http://127.0.0.1:3000/api/login`;
    return axios.post(api, userObj).then(res => res.data);
}
// function updateBug(bugId, newSpeed) {
//     var bug = gBugs.find(bug => bug.id === bugId)
//     bug.maxSpeed = newSpeed;
//     storageService.store(BUGS_KEY, gBugs);

//     return Promise.resolve(bug);
// }


