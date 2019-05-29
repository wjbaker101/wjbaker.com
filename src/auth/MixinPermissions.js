export default (user, next, previousURL) => ({
    none() {
        next(vm => vm.setUser(user));
    },

    user() {
        if (!user) {
            next('/login');
        }
        else {
            next(vm => vm.setUser(user));
        }
    },

    admin() {
        if (!user || !user.isAdmin) {
            next(previousURL);
        }
        else {
            next(vm => vm.setUser(user));
        }
    },

    anonymous() {
        console.log(user);
        if (user) {
            next(previousURL);
        }
        else {
            next();
        }
    },
})