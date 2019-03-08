// SERVICES
import bugService from "../services/bug-service.js";

export default {
  template: `
        <section v-if="bug">
            <h1>{{(bug._id)? 'Bug Edit' : 'Bug Add'}}</h1>
            <form @submit.prevent="saveBug">
                <label>Bug Vendor:</label>
                <input type="text" v-model="bug.vendor" />
                <button type="submit">Save</button>
            </form>
            {{bug}}
           
        </section>  
    `,
  data() {
    return {
      bug: null
    };
  },
  created() {
    let { bugId } = this.$route.params;

    if (bugId) {
      bugService.getById(bugId).then(bug => (this.bug = bug));
    } else {
      this.bug = bugService.getEmpty()
    }
  },
  methods: {
    saveBug() {
      console.log("Saving bug..", this.bug);
      bugService.save(this.bug).then(savedBug => {
        console.log("Saved Bug", savedBug);
        this.$router.push('/bug')
      });
    }
  }
};
