<template>
    <div class="page-content">
        <div v-if="user">
            <h1>{{ user.username }}</h1>
            <p><strong>Created On:</strong> {{ createdOn }}</p>
            <p v-if="user.isAdmin">You are an Admin!</p>
            <p>
                <ButtonComponent
                    @click.native="onLogoutClicked"
                    :doShowLoadingIcon="isLoggingOut"
                    :isDisabled="isLoggedOut">

                    Log Out
                </ButtonComponent>
            </p>
        </div>
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';
    import API from '@/api/API.js';
    import DateUtils from '@/util/DateUtils.js';
    import ButtonComponent from '@/components/item/ButtonComponent.vue';

    export default {
        name: 'UserRoute',

        mixins: [ BaseRouteMixin ],

        components: {
            ButtonComponent,
        },

        data() {
            return {
                user: null,
                isLoggingOut: false,
                isLoggedOut: false,
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
            next(vm => vm.setUser(response));
        },

        async beforeRouteUpdate(to, from, next) {
            const response = await API.getUser();
            this.setUser(response);
            next();
        },

        methods: {
            setUser(response) {
                if (response.error) {
                    this.$router.push('/login');
                }

                this.user = response.result;
            },

            async onLogoutClicked() {
                this.isLoggingOut = true;
                const response = await API.logout();
                this.isLoggingOut = false;
                this.isLoggedOut = true;

                if (!response.error) {
                    this.$router.push('/login');
                }
            },
        },
    }
</script>

<style lang="scss">

</style>
