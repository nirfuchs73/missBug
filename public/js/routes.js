import homeCmp from './cmps/home-cmp.js';
import aboutCmp from './cmps/about-cmp.js';
import bugsApp from './pages/bugs-app-cmp.js';
import loginCmp from './pages/bugs-login-cmp.js';
import signupCmp from './pages/bugs-signup-cmp.js';

// import booksAdd from './pages/book-add-cmp.js';
// import bookDetails from './cmps/book-details-cmp.js';

const routes = [
    { path: '/', component: homeCmp },
    { path: '/login', component: loginCmp },
    { path: '/signup', component: signupCmp },
    { path: '/bugs', component: bugsApp },
    // { path: '/books/:bookId', component: bookDetails },
    // { path: '/addbook', component: booksAdd },
    { path: '/about', component: aboutCmp }

];

export default routes;