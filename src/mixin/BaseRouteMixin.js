import { ImmortalDB } from 'immortal-db';
import API from '@/api/API.js';
import Permissions from '@/auth/MixinPermissions.js';

export default (permissionLevel = 'none') => ({

    props: [ 'page' ],

    data() {
        return {
            currentUser: null,
        }
    },

    async beforeRouteEnter(to, from, next) {
        const isAuthenticated = await API.authCheck();

        if (!isAuthenticated || !isAuthenticated.result) {
            await ImmortalDB.remove('current-user');
        }

        const user = JSON.parse(await ImmortalDB.get('current-user', null));

        Permissions(user, next, from.path)[permissionLevel]();
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
})