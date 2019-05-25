<template>
    <div class="page-content">
        <div v-if="user">
            <h1>{{ user.username }}</h1>
            <p><strong>Created On:</strong> {{ createdOn }}</p>
            <p v-if="user.isAdmin">You are an Admin!</p>
            <p>
                <button @click="onLogoutClicked">Log Out</button>
            </p>
        </div>
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';
    import API from '@/api/API.js';
    import DateUtils from '@/util/DateUtils.js';

    export default {
        name: 'UserRoute',

        mixins: [ BaseRouteMixin ],

        data() {
            return {
                user: null,
            }
        },

        computed: {
            createdOn: function() {
                if (!this.user) {
                    return '';
                }

                const date = new Date(this.user.createdOn);

                return DateUtils.formatDate(date);
            },
        },

        async beforeRouteEnter(to, from, next) {
            const response = await API.getUser();
            next(vm => vm.setUser(response.result));
        },

        async beforeRouteUpdate(to, from, next) {
            const response = await API.getUser();
            this.setUser(response.result);
            next();
        },

        methods: {
            setUser(user) {
                this.user = user;
            },

            async onLogoutClicked() {
                const response = await API.logout();

                console.log(response);

                if (!response.error) {
                    this.$router.push('/login');
                }
            },
        },
    }
</script>

<style lang="scss">

</style>
