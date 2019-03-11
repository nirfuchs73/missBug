export default {
    props: ['bug'],
    template: `
        <!-- <li class="bug-preview">
            {{bug.vendor}}
            <router-link :to="'/bug/'+bug._id">Full Details</router-link>
            <router-link :to="'/bug/edit/'+bug._id">Edit</router-link>
        </li> -->
        <div class="bug-preview flex">
            <div>{{bug.creator.name}} {{bug.title}}</div>
            <!-- <router-link :to="'/bug/'+bug._id">Full Details</router-link> -->
            <!-- <router-link :to="'/bug/edit/'+bug._id">Edit</router-link> -->
        </div>
    `,
}