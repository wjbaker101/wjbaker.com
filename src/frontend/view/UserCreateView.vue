<template>
    <PageContentComponent class="user-create-view">
        <PageTitleComponent title="Login" />
        <p>
            <label>Username</label>
            <input type="text" v-model="username">
        </p>
        <p>
            <label>Password</label>
            <input type="password" v-model="password1">
        </p>
        <p>
            <label>Confirm Password</label>
            <input type="password" v-model="password2">
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
    export default class UserCreateView extends Vue {

        private username: string = '';
        private password1: string = '';
        private password2: string = '';

        private error: string | null = null;

        async onLogin(): Promise<void> {
            if (!this.isInputValid()) {
                return;
            }

            const result = await API.createUser({
                id: '',
                username: this.username,
                password: this.password1,
                isAdmin: false,
                creationDate: new Date(),
            });

            if (result instanceof Error) {
                this.error = 'Unable to create user; try again or change your desired credentials.';
                return;
            }

            this.$router.push({ path: '/user/login', });
        }

        isInputValid(): boolean {
            this.error = null;

            if (this.username.length === 0) {
                this.error = 'Please enter your desired username.';
                return false;
            }

            if (this.password1.length === 0) {
                this.error = 'Please enter your desired password.';
                return false;
            }

            if (this.password2.length === 0) {
                this.error = 'Please confirm your desired password.';
                return false;
            }

            if (this.password1 !== this.password2) {
                this.error = 'Your passwords do not match.';
                return false;
            }

            if (this.username.length < 3) {
                this.error = 'Please enter a username with 3 or more characters.';
                return false;
            }

            if (this.password1.length < 3 || this.password2.length < 3) {
                this.error = 'Please enter a password with 3 or more characters.';
                return false;
            }

            return true;
        }
    }
</script>

<style lang="scss">
</style>
