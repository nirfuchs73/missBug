// cmps
import bugPreview from './bug-preview-cmp.js';

export default {
  props: ["bugs"],
  components: {
    bugPreview
  },
  template: `
        <ul class="bug-list">
            <div v-for="bug in bugs" :key="bug._id">
                <bug-preview :bug="bug"> </bug-preview>
                <button @click="$emit('delete-bug', bug._id)">x</button>
            </div>
        </ul>
    `
};
