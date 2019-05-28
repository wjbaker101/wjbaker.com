import { ImmortalDB } from 'immortal-db';

export default (page) => ({

    async beforeRouteEnter (to, from, next) {
        const user = JSON.parse(await ImmortalDB.get('current-user', null));

        if (!user || !user.isAdmin) {
            next(page);
        }
        else {
            next(vm => {
                vm.setUser(user);
            });
        }
    },

    methods: {
        setUser(user) {
            this.currentUser = user;
        }
    },
})