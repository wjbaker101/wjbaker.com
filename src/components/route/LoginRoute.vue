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
                :doShowLoadingIcon="isLoggingIn"
                :isDisabled="isLoggedIn">

                Log In
            </ButtonComponent>
        </p>
        <p v-if="message">{{ message }}</p>
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';
    import API from '@/api/API.js';
    import { ImmortalDB } from 'immortal-db';

    import ButtonComponent from '@/components/item/ButtonComponent.vue';

    export default {
        name: 'LoginRoute',

        mixins: [ BaseRouteMixin('anonymous') ],

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
                isLoggedIn: false,
                message: null,
            }
        },

        methods: {
            async onLoginClicked() {
                this.message = null;
                this.isLoggingIn = true;
                this.isLoggedIn = false;

                if (this.credentials.username.length === 0) {
                    this.message = 'Please enter your username.';
                    this.isLoggingIn = false;
                    return;
                }

                if (this.credentials.password.length === 0) {
                    this.message = 'Please enter your password.';
                    this.isLoggingIn = false;
                    return;
                }

                const response = await API.login(
                        this.credentials.username,
                        this.credentials.password);

                this.isLoggingIn = false;

                if (!response || !response.error) {
                    this.isLoggedIn = true;
                    this.message = 'Successfully logged in!';

                    await ImmortalDB.set(
                            'current-user',
                            JSON.stringify(response.result));

                    this.$router.push('/user');
                }
                else {
                    this.message = response.error;
                }
            },
        },
    }
</script>

<style lang="scss">

</style>
