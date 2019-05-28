import { ImmortalDB } from 'immortal-db';

export default () => {
    return async (to, from, next) => {
        const user = JSON.parse(await ImmortalDB.get('current-user', null));
        console.log(user);

        next({
            // path: to.path,
            params: {
                currentUser: user,
            }
        });
    }
}