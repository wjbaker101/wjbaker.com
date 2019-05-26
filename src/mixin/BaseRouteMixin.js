import { ImmortalDB } from 'immortal-db';

export default {

    props: [ 'page' ],

    data() {
        return {
            currentUser: null,
        }
    },

    async beforeRouteEnter(to, from, next) {
        const user = await ImmortalDB.get('current-user', null);
        next(vm => vm.setCurrentUser(JSON.parse(user)));
    },

    async beforeRouteUpdate(to, from, next) {
        const user = await ImmortalDB.get('current-user', null);
        this.setCurrentUser(JSON.parse(user));
        next();
    },

    methods: {
        setCurrentUser(user) {
            this.currentUser = user;
        },
    },

    /**
     * Called when the component is shown onto the webpage. It will emit
     * and event, which will tell the rest of the app which page is currently
     * being shown.
     */
    created() {
        this.$emit('navpageinit', this.page);
    },
}