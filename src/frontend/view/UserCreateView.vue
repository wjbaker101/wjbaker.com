<template>
    <PageContentComponent class="user-create-view">
        <PageTitleComponent title="Create User" />
        <ReturnContainerComponent
            returnLink="/user/login"
            returnText="Return to Login"
        />
        <p>
            <label>Username</label>
            <input
                ref="usernameInput"
                type="text"
                v-model="username"
                @keyup.enter="onUsernameInputEnter"
                v-autofocus
            >
        </p>
        <p>
            <label>Password</label>
            <input
                ref="password1Input"
                type="password"
                v-model="password1"
                @keyup.enter="onPassword1InputEnter"
            >
        </p>
        <p>
            <label>Confirm Password</label>
            <input
                ref="password2Input"
                type="password"
                v-model="password2"
                @keyup.enter="onPassword2InputEnter"
                >
        </p>
        <p>
            <ButtonComponent @click="onLogin">Login</ButtonComponent>
        </p>
        <ErrorComponent v-if="error !== null" :message="error" />
    </PageContentComponent>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Ref } from 'vue-property-decorator';

    import { API } from '@frontend/api/API';

    import PageContentComponent from '@frontend/component/page/PageContentComponent.vue';
    import PageTitleComponent from '@frontend/component/page/PageTitleComponent.vue';
    import ReturnContainerComponent from '@frontend/component/page/ReturnContainerComponent.vue';

    import ButtonComponent from '@frontend/component/ButtonComponent.vue';
    import ErrorComponent from '@frontend/component/ErrorComponent.vue';
    import LoadingComponent from '@frontend/component/LoadingComponent.vue';

    @Component({
        components: {
            ButtonComponent,
            PageContentComponent,
            ReturnContainerComponent,
            PageTitleComponent,
            ErrorComponent,
            LoadingComponent,
        },
    })
    export default class UserCreateView extends Vue {

        @Ref('usernameInput')
        private readonly usernameInput!: HTMLInputElement;

        @Ref('password1Input')
        private readonly password1Input!: HTMLInputElement;

        @Ref('password2Input')
        private readonly password2Input!: HTMLInputElement;

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

        onUsernameInputEnter(): void {
            if (this.password1.length === 0) {
                this.password1Input.focus();
            }
            else if (this.password2.length === 0) {
                this.password2Input.focus();
            }
            else {
                this.onLogin();
            }
        }

        onPassword1InputEnter(): void {
            if (this.password2.length === 0) {
                this.password2Input.focus();
            }
            else if (this.username.length === 0) {
                this.usernameInput.focus();
            }
            else {
                this.onLogin();
            }
        }

        onPassword2InputEnter(): void {
            if (this.username.length === 0) {
                this.usernameInput.focus();
            }
            else if (this.password1.length === 0) {
                this.password1Input.focus();
            }
            else {
                this.onLogin();
            }
        }
    }
</script>

<style lang="scss">
</style>
