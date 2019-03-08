import homeCmp from './pages/home-cmp.js';
import aboutCmp from './pages/about-cmp.js';
import bugApp from './pages/bug-app-cmp.js';
import bugEdit from './pages/bug-edit-cmp.js';
import bugDetails from './pages/bug-details-cmp.js';
import loginCmp from './pages/bug-login-cmp.js';
import signupCmp from './pages/bug-signup-cmp.js';
import userListCmp from './pages/user-list-cmp.js';

const routes = [
    { path: '/', component: homeCmp },
    { path: '/login', component: loginCmp },
    { path: '/signup', component: signupCmp },
    { path: '/bug', component: bugApp },
    { path: '/bug/edit/:bugId?', component: bugEdit },
    { path: '/bug/:bugId', component: bugDetails },
    { path: '/about', component: aboutCmp },
    { path: '/user', component: userListCmp }

];

export default routes;