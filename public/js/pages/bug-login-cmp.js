import userService from '../services/user-service.js';

export default {
    template: `
        <section class="bug-login">
            <h1>Login</h1>
            <form v-on:submit.prevent="onLoginClicked">
                <input class="bugs-login-text" placeholder="Username" type="text" v-model="user.userName">
                <input class="bugs-login-password" placeholder="Password" type="password" v-model="user.password">
                <button type="submit">Login</button>
            </form>
        </section> 
    `,
    data() {
        return {
            user: {
                userName: '',
                password: ''
            }
        }
    },
    created() {

    },
    methods: {
        onLoginClicked() {
            userService.login(this.user)
                .then(user => {
                    if (user) {
                        console.log('User logged in: ', user);
                        this.$router.push('/bug');
                    }
                }).catch(err => {
                    console.log(err);
                    console.log('User not exist');
                    this.$router.push('/signup');
                });
        }
    },
    computed: {


    },
    components: {
        userService
    }
}