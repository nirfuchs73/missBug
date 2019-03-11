// cmps
import bugPreview from './bug-preview-cmp.js';
import userService from '../services/user-service.js';

export default {
    props: ["bugs"],
    template: `
        <!-- <ul class="bug-list">
            <div v-for="bug in bugs" :key="bug._id">
                <bug-preview :bug="bug"> </bug-preview>
                <button @click="$emit('delete-bug', bug._id)">x</button>
            </div>
        </ul> -->
        <section class="bug-list flex">
            <router-link class="bug-list-row flex" v-for="(currBug, idx) in bugs" :key="currBug._id" :to="'/bug/' + currBug._id">
                <bug-preview class="bug-list-preview" v-bind:bug="currBug"></bug-preview>
                    <div class="bug-list-buttons flex">
                        <button v-if="currBug.creator.name === loggedInUser.userName || loggedInUser.isAdmin" v-on:click.stop.prevent="onDeleteBug(currBug)">Delete</button>
                        <button v-if="currBug.creator.name === loggedInUser.userName || loggedInUser.isAdmin" v-on:click.stop.prevent="onEditBug(currBug)">Edit</button>
                    </div>
            </router-link>
        </section>
    `,
    data() {
        return {
            loggedInUser: null
        }
    },
    methods: {
        onDeleteBug(bug) {
            this.$emit('delete', bug._id);
        },
        onEditBug(bug) {
            this.$emit('edit', bug._id);
        },
    },
    created() {
        this.loggedInUser = userService.getLoggedInUser();
        console.log(this.loggedInUser);

    },
    components: {
        bugPreview,
        userService
    },
};
