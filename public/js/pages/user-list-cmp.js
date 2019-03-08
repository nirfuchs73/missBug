import userService from '../services/user-service.js';

export default {
    template: `
        <section class="user-list">
            <h1>User List</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Id</th>
                        <th>Password</th>
                        <th>Is Admin</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody  v-for="(currUser, idx) in users" :key="currUser._id">
                    <tr>
                        <td>{{currUser.userName}}</td>
                        <td>{{currUser._id}}</td>
                        <td>{{currUser.password}}</td>
                        <td>{{currUser.isAdmin}}</td>
                        <td><button v-on:click="deleteUser(currUser._id)">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </section> 

        `,
    data() {
        return {
            users: [],
            loggedInUser: null
        }
    },
    methods: {
        deleteUser(userId) {
            userService.getBugById(userId)
                .then(user => {
                    if (user.userName !== this.loggedInUser.userName) {
                        userService.deleteUser(userId)
                            .then(res => {
                                console.log(res);
                            });
                    } else {
                        console.log('Can not delete', this.loggedInUser.userName);
                    }
                });
        },
    },
    created() {
        this.loggedInUser = userService.getLoggedInUser();
        userService.query()
            .then(users => {
                // console.log('query');
                console.log(users);
                this.users = users;
            });
    }
}
