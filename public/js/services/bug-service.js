import storageService from './storage-service.js';
const BUGS_KEY = 'bugs';

export default {
    getBugs: getBugs,
    getBugById: getBugById,
    addReview: addReview,
    deleteBug: deleteBug,
    deleteReview: deleteReview,
    addGoogleBug: addGoogleBug
    // addBug: addBug,
    // updateBug: updateBug
}
var gBugs;

_createBugs();

function getBugs() {
    // return Promise.resolve(gBugs);
    var api = 'http://127.0.0.1:3000/api/bug';
    return axios.get(api).then(res => res.data);
}

function deleteBug(bugId) {
    var bugIdx = gBugs.findIndex(bug => bugId === bug.id);
    gBugs.splice(bugIdx, 1);
    storageService.store(BUGS_KEY, gBugs);
    return Promise.resolve();
}

// function addBug(vendor) {
//     var bug = _createBug(vendor);
//     gBugs.push(bug);
//     storageService.store(BUGS_KEY, gBugs);
//     return Promise.resolve(bug)
// }

function addGoogleBug(googleBug) {
    var isBugExist = gBugs.some(bug => bug.id === googleBug.id);
    if (isBugExist) return Promise.reject('Bug alreay exist');
    var bug = _convertGoogleBug(googleBug);
    gBugs.push(bug);
    storageService.store(BUGS_KEY, gBugs);
    return Promise.resolve(bug);
}

function _convertGoogleBug(googleBug) {
    var bug = _createBug();
    if (googleBug.id) bug.id = googleBug.id;
    if (googleBug.volumeInfo.title) bug.title = googleBug.volumeInfo.title;
    if (googleBug.volumeInfo.subtitle) bug.subtitle = googleBug.volumeInfo.subtitle;
    if (googleBug.volumeInfo.authors) bug.authors = googleBug.volumeInfo.authors;
    if (googleBug.volumeInfo.publishedDate) bug.publishedDate = googleBug.volumeInfo.publishedDate;
    if (googleBug.volumeInfo.description) bug.description = googleBug.volumeInfo.description;
    if (googleBug.volumeInfo.pageCount) bug.pageCount = googleBug.volumeInfo.pageCount;
    if (googleBug.volumeInfo.categories) bug.categories = googleBug.volumeInfo.categories;
    if (googleBug.volumeInfo.imageLinks) {
        if (googleBug.volumeInfo.imageLinks.smallThumbnail)
            bug.thumbnail = googleBug.volumeInfo.imageLinks.smallThumbnail;
    }
    if (googleBug.volumeInfo.language) bug.language = googleBug.volumeInfo.language;
    if (googleBug.saleInfo.listPrice) bug.listPrice = googleBug.saleInfo.listPrice;

    // var bug = {
    //     // id: googleBug.id,
    //     // title: googleBug.volumeInfo.title,
    //     // subtitle: googleBug.volumeInfo.subtitle,
    //     // authors: googleBug.volumeInfo.authors,
    //     // publishedDate: googleBug.volumeInfo.publishedDate,
    //     // description: googleBug.volumeInfo.description,
    //     // pageCount: googleBug.volumeInfo.pageCount,
    //     // categories: googleBug.volumeInfo.categories,
    //     // thumbnail: googleBug.volumeInfo.imageLinks.smallThumbnail,
    //     // language: googleBug.volumeInfo.language,
    //     // listPrice: googleBug.saleInfo.listPrice,
    //     // reviews: []
    // };
    // if (googleBug.volumeInfo.imageLinks) {
    //     bug.thumbnail = googleBug.volumeInfo.imageLinks.smallThumbnail;
    // } else {
    //     bug.thumbnail = googleBug.volumeInfo.previewLink;
    // }

    // if (googleBug.saleInfo.listPrice) {
    //     bug.listPrice = googleBug.saleInfo.listPrice;
    //     bug.listPrice.isOnSale = false;
    // } else {
    //     bug.listPrice = { amount: 0, currencyCode: '', isOnSale: false };
    // }

    return bug;
}

function _createBug() {
    var bug = {
        id: '',
        title: '',
        subtitle: '',
        authors: [],
        publishedDate: 0,
        description: '',
        pageCount: 0,
        categories: [],
        thumbnail: 'https://www.coding-academy.org/bugs-photos/2.jpg',
        language: '',
        listPrice: {
            amount: 0,
            currencyCode: '',
            isOnSale: false
        },
        reviews: []
    };

    return bug;
}

function getBugById(bugId) {
    var bug = gBugs.find(function (bug) {
        return bugId === bug.id
    })
    return Promise.resolve(bug);
}

// function updateBug(bugId, newSpeed) {
//     var bug = gBugs.find(bug => bug.id === bugId)
//     bug.maxSpeed = newSpeed;
//     storageService.store(BUGS_KEY, gBugs);

//     return Promise.resolve(bug);
// }

function addReview(bugId, review) {
    var bug = gBugs.find(bug => bug.id === bugId);
    if (!bug['reviews']) {
        bug['reviews'] = [review];
    } else {
        bug['reviews'].push(review);
    }
    storageService.store(BUGS_KEY, gBugs);
    return Promise.resolve(bug);
}

function deleteReview(bugId, reviewIdx) {
    var bug = gBugs.find(bug => bug.id === bugId);
    bug['reviews'].splice(reviewIdx, 1);
    storageService.store(BUGS_KEY, gBugs);
    return Promise.resolve();
}


function _createBugs() {
    gBugs = storageService.load(BUGS_KEY);
    if (gBugs && gBugs.length) return;
    var bugs = [];


    storageService.store(BUGS_KEY, bugs);
    gBugs = bugs;
}

