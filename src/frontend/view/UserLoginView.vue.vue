<template>
    <PageContentComponent class="user-login-view">
        <PageTitleComponent title="Login" />
        <p>
            <label>Username</label>
            <input type="text" v-model="username" v-autofocus>
        </p>
        <p>
            <label>Password</label>
            <input type="password" v-model="password">
        </p>
        <p>
            <ButtonComponent @click="onLogin">Login</ButtonComponent>
        </p>
        <ErrorComponent v-if="error !== null" :message="error" />
    </PageContentComponent>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import { API } from '@frontend/api/API';

    import PageContentComponent from '@frontend/component/page/PageContentComponent.vue';
    import PageTitleComponent from '@frontend/component/page/PageTitleComponent.vue';

    import ButtonComponent from '@frontend/component/ButtonComponent.vue';
    import ErrorComponent from '@frontend/component/ErrorComponent.vue';
    import LoadingComponent from '@frontend/component/LoadingComponent.vue';

    @Component({
        components: {
            ButtonComponent,
            PageContentComponent,
            PageTitleComponent,
            ErrorComponent,
            LoadingComponent,
        },
    })
    export default class UserLoginView extends Vue {

        private username: string = '';
        private password: string = '';

        private isLoading: boolean = false;
        private error: string | null = null;

        async onLogin(): Promise<void> {
            if (!this.isInputValid()) {
                return;
            }

            this.isLoading = true;
            this.error = null;

            const user = await API.login(this.username, this.password);

            this.isLoading = false;

            if (user instanceof Error) {
                this.error = 'Unable to log in, please check credentials and try again.';
                return;
            }

            this.$store.dispatch('setUser', user);

            this.$router.push({ path: '/user', });
        }

        isInputValid(): boolean {
            this.error = null;

            if (this.username.length === 0) {
                this.error = 'Please enter your username.';
                return false;
            }

            if (this.password.length === 0) {
                this.error = 'Please enter your password.';
                return false;
            }

            if (this.username.length < 3) {
                this.error = 'Please enter a username with 3 or more characters.';
                return false;
            }

            if (this.password.length < 3) {
                this.error = 'Please enter a password with 3 or more characters.';
                return false;
            }

            return true;
        }
    }
</script>

<style lang="scss">
</style>
