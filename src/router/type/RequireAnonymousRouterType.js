import { ImmortalDB } from 'immortal-db';

export default (page) => {
    return async (to, from, next) => {
        const user = JSON.parse(await ImmortalDB.get('current-user', null));

        to.props

        if (user) {
            next(page);
        }
        else {
            next(vm => {
                vm.currentUser = user;
            });
        }
    }
}