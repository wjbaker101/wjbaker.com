<template>
    <div class="page-content">
        <h1>Login</h1>
        <p>Log into a user. Some pages and actions require an Admin user.</p>
        <p>
            <label>Username</label><br>
            <input type="text" v-model="credentials.username">
        </p>
        <p>
            <label>Password</label><br>
            <input type="password" v-model="credentials.password">
        </p>
        <p>
            <ButtonComponent
                @click.native="onLoginClicked"
                :doShowLoadingIcon="isLoggingIn">

                Log In
            </ButtonComponent>
        </p>
        <p v-if="message">{{ message }}</p>
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';
    import API from '@/api/API.js';

    import ButtonComponent from '@/components/item/ButtonComponent.vue';

    export default {
        name: 'LoginRoute',

        mixins: [ BaseRouteMixin ],

        components: {
            ButtonComponent,
        },

        data() {
            return {
                credentials: {
                    username: '',
                    password: '',
                },
                isLoggingIn: false,
                message: null,
            }
        },

        methods: {
            async onLoginClicked() {
                this.message = null;
                this.isLoggingIn = true;

                const response = await API.login(
                        this.credentials.username,
                        this.credentials.password);

                this.isLoggingIn = false;

                this.message = response.error || response.result;

                if (!response.error) {
                    this.$router.push('/user');
                }
            },
        },
    }
</script>

<style lang="scss">

</style>
