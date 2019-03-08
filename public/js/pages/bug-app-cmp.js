import bugService from '../services/bug-service.js';
import userService from '../services/user-service.js';

export default {
    template: `
        <section class="bugs-app">
            <h1>Bugs App</h1>
            <div class="flex">
                Loggedin User:
                {{loggedInUser.userName}}
                <button v-on:click="onLogoutClicked">Logout</button>
                <button v-show="isAdmin" v-on:click="onUserClicked">Users</button>

            </div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Severity</th>
                        <th>Creator</th>
                        <th>Creator Id</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody  v-for="(currBug, idx) in bugs" :key="currBug._id">
                    <tr>
                        <td>{{currBug.title}}</td>
                        <td>{{currBug.description}}</td>
                        <td>{{currBug.severity}}</td>
                        <td>{{currBug.creator.name}}</td>
                        <td>{{currBug.creator._id}}</td>
                        <td><button v-on:click="deleteBug(currBug._id)">Delete</button></td>
                        <td><button v-on:click="editBug(currBug._id)">Edit</button></td>
                    </tr>
                </tbody>
            </table>
            <button v-on:click="onAddBugClicked">Add bug</button>
            <!-- <button v-on:click="onLogoutClicked">Logout</button> -->

            <!-- <book-add></book-add>
            <book-filter v-on:filtered="setFilter"></book-filter>
            <book-list v-bind:books="booksToShow"></book-list>
            <book-details v-bind:book="selectedBook"></book-details> -->
        </section> 
    `,
    data() {
        return {
            bugs: [],
            loggedInUser: null,
            bug: {
                title: 'New bug',
                description: 'New bug',
                severity: 2,
                createdAt: Date.now(),
                creator: {
                    id: 'abc',
                    name: 'name'
                }
            },
            isAdmin: false

        }
    },
    created() {
        this.loggedInUser = userService.getLoggedInUser();
        if (this.loggedInUser) {
            bugService.query(this.loggedInUser.userName, this.loggedInUser.isAdmin)
                .then(bugs => {
                    console.log('query');
                    console.log(bugs);
                    this.bugs = bugs;
                    this.isAdmin = this.loggedInUser.isAdmin;
                });
        } else {
            this.$router.push('/login');
        }
    },
    methods: {
        deleteBug(bugId) {
            bugService.deleteBug(bugId)
                .then(res => {
                    console.log(res);
                });
        },
        editBug(bugId) {

        },
        onAddBugClicked() {
            bugService.addBug(this.bug)
                .then(res => {
                    console.log(res);
                    // bugService.query()
                    //     .then(bugs => {
                    //         this.bugs = bugs;
                    //     });
                })

        },
        onLogoutClicked() {
            console.log('onLogoutClicked');
            userService.logOut()
                .then(res => {
                    console.log('User logged out', res);
                    this.$router.push('/login');
                })
        },
        onUserClicked() {
            console.log('onUserClicked');
            this.$router.push('/user');
        }
    },
    computed: {

    },
    components: {
        // bookList,
        // bookDetails,
        // bookFilter,
        // bookAdd
    }
}