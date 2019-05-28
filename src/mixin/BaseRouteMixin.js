import { ImmortalDB } from 'immortal-db';

export default {

    props: [ 'page' ],

    data() {
        return {
            currentUser: null,
        }
    },

    async beforeRouteEnter(to, from, next) {
        const user = JSON.parse(await ImmortalDB.get('current-user', null));

        next(vm => {
            vm.setUser(user);
        });
    },

    methods: {
        setUser(user) {
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