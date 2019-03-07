import userService from '../services/user-service.js';


export default {
    template: `
        <section class="bugs-signup">
            <h1>Signup</h1>
            <form v-on:submit.prevent="onSignupClicked">
                <input class="bugs-signup-text" placeholder="Username" type="text" v-model="user.userName">
                <input class="bugs-signup-password" placeholder="Password" type="password" v-model="user.password">
                <button type="submit">Signup</button>
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
        onSignupClicked() {
            userService.signUp(this.user)
                .then(user => {
                    console.log('New user was added: ', user);
                    this.$router.push('/bugs');
                })
                .catch(err => {
                    console.log('User already exist', err);
                    this.$router.push('/signup');
                })
        }
    },
    computed: {


    },
    components: {
        userService
    }
}