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
            <button @click="onLoginClicked">Log In</button>
        </p>
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';
    import API from '@/api/API.js';

    export default {
        name: 'LoginRoute',

        mixins: [ BaseRouteMixin ],

        data() {
            return {
                credentials: {
                    username: '',
                    password: '',
                }
            }
        },

        methods: {
            async onLoginClicked() {
                const response = await API.login(
                        this.credentials.username,
                        this.credentials.password);

                console.log(response);

                if (!response.error) {
                    this.$router.push('/user');
                }
            },
        },
    }
</script>

<style lang="scss">

</style>
