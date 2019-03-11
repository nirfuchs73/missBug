// SERVICES
import bugService from "../services/bug-service.js";

export default {
    template: `
        <section v-if="bug">
            <h1>{{(bug._id)? 'Bug Edit' : 'Bug Add'}}</h1>
            <form v-on:submit.prevent="saveBug" class="bug-edit flex">
                <div class="flex"> 
                    <label>Title:</label>
                    <input type="text" v-model="bug.title" />
                </div>
                <div class="flex"> 
                    <label>Description:</label>
                    <input type="text" v-model="bug.description" />
                </div>
                <div class="flex"> 
                    <label>Severity:</label>
                    <input type="text" v-model="bug.severity" />
                </div>
                <div class="flex"> 
                    <button type="submit">Save</button>
                </div>
            </form>
            <!-- {{bug}} -->
           
        </section>  
    `,
    data() {
        return {
            bug: null
        };
    },
    created() {
        // let { bugId } = this.$route.params;
        var bugId = this.$route.params.bugId;

        if (bugId) {
            bugService.getBugById(bugId)
                .then(bug => (this.bug = bug));
        } else {
            this.bug = bugService.getEmpty()
        }
    },
    methods: {
        saveBug() {
            console.log("Saving bug..", this.bug);
            bugService.updateBug(this.bug)
                .then(savedBug => {
                    console.log("Saved Bug", savedBug);
                    this.$router.push('/bug');
                });
        }
    }
};
