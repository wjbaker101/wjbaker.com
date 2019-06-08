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
        const cache = await ImmortalDB.get('current-user', null);
        const cachedUser = JSON.parse(cache);

        if (cachedUser === null) {
            Permissions(false, next, from.path)[permissionLevel]();
            return;
        }

        if (Date.now() - cachedUser.timestamp > 24 * 60 * 60 * 1000) {
            await ImmortalDB.remove('current-user');
            Permissions(false, next, from.path)[permissionLevel]();
            return;
        }

        Permissions(cachedUser.user, next, from.path)[permissionLevel]();
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