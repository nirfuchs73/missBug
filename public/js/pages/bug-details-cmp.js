// SERVICES
import bugService from '../services/bug-service.js';


export default {
    template: `
        <section v-if="bug">
            <h1>Bug Details</h1>
            <!-- {{bug}} -->
            <div>Id: {{bug._id}}</div>
            <div>Title: {{bug.title}}</div>
            <div>Description: {{bug.description}}</div>
            <div>Severity: {{bug.severity}}</div>
            <div>Created at: {{formattedDate}}</div>
            <div>Creator: {{bug.creator.name}}</div>
        </section>  
    `,
    data() {
        return {
            bug: null,
        };
    },
    created() {
        // let {bugId} = this.$route.params
        var bugId = this.$route.params.bugId;
        console.log(bugId);
        bugService.getBugById(bugId)
            .then(bug => this.bug = bug);
    },
    computed: {
        formattedDate() {
            return moment(this.bug.createdAt).format('MMMM Do YYYY, h:mm:ss a');
        }
    }
}