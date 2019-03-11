// import storageService from './storage-service.js';

export default {
    query: query,
    deleteBug: deleteBug,
    getBugById: getBugById,
    addBug: addBug,
    getEmpty: getEmpty,
    updateBug: updateBug
}
var bugs = [];
const API_URL = '/api/bug';

// function query(filterQuery = '') {
// return axios.get(`${API_URL}${filterQuery}`)

// function query(userName, isAdmin) {
// var api = `/api/bug?userName=${userName}&isAdmin=${isAdmin}`;
function query(filterQuery = '') {
    var api = `/api/bug?${filterQuery}`;
    return axios.get(api)
        .then(res => res.data)
        .then(loadedBugs => {
            bugs = loadedBugs;
            return bugs;
        });
}

function deleteBug(bugId) {
    var api = `/api/bug/${bugId}`;
    return axios.delete(api)
        .then(res => res.data)
        .then(() => {
            const idx = bugs.findIndex(bug => bug._id === bugId);
            bugs.splice(idx, 1);
        });
}

function updateBug(bug) {
    var api = `/api/bug/${bug._Id}`;
    return axios.put(api, bug)
        .then(res => res.data)
        .then(updatedBug => {
            // TODO: bugs.findIndex, and replcae the bug
            // var bugIdx = bugs.findIndex(updatedBug => currBug.id === bug._id);
            // bugs.splice(bugIdx, 1, bug);
            return updatedBug;
        });
}


function addBug(bug) {
    var api = `/api/bug`;
    return axios.post(api, bug)
        .then(res => res.data)
        .then(addedBug => {
            // console.log(addedBug);
            bugs.push(addedBug);
            return addedBug;
        });
}

function getBugById(bugId) {
    var api = `/api/bug/${bugId}`;
    return axios.get(api)
        .then(res => res.data);
}

function getEmpty() {
    return {
        title: '',
        description: '',
        severity: ''
    }
}



