// SERVICES
import bugService from '../services/bug-service.js';


export default {
    template: `
        <section>
            <h1>Bug Details</h1>
            {{bug}}
        </section>  
    `,
    data() {
        return {
            bug: null,
        };
    },
    created() {
        let {bugId} = this.$route.params
        bugService.getById(bugId)
            .then(bug => this.bug = bug);
    }
}