<template>
    <PageContentComponent class="user-login-view">
        <PageTitleComponent title="Login" />
        <label>
            <strong>Username</strong>
            <input ref="usernameElement" type="text" v-model="usernameField" @keyup.enter="onUsernameEnter">
        </label>
        <label>
            <strong>Password</strong>
            <input ref="passwordElement" type="password" v-model="passwordField" @keyup.enter="onPasswordEnter">
        </label>
        <label>
            <ButtonComponent @click="onLogIn">Log In</ButtonComponent>
        </label>
        <ErrorComponent
            v-if="isError"
            message="Unable to log in; please refresh the page and try again."
        />
    </PageContentComponent>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/PageTitle.component.vue';
import ButtonComponent from '@/component/Button.component.vue';
import ErrorComponent from '@/component/Error.component.vue';

import { userService } from '@/service/user/User.service';

export default defineComponent({
    name: 'UserLoginView',

    components: {
        PageContentComponent,
        PageTitleComponent,
        ButtonComponent,
        ErrorComponent,
    },

    setup() {
        const router = useRouter();

        const usernameElement = ref<HTMLInputElement | null>(null);
        const passwordElement = ref<HTMLInputElement | null>(null);

        const usernameField = ref<string>('');
        const passwordField = ref<string>('');

        const isLoading = ref<boolean>(false);
        const isError = ref<boolean>(false);

        const logIn = async function () {
            isLoading.value = true;
            isError.value = false;

            const result = await userService.logIn(usernameField.value, passwordField.value);
            if (result instanceof Error) {
                isLoading.value = false;
                isError.value = true;
                return;
            }

            router.push({
                path: '/user',
            });
        };

        return {
            usernameElement,
            passwordElement,

            usernameField,
            passwordField,

            isLoading,
            isError,

            async onUsernameEnter() {
                if (usernameField.value.length === 0)
                    return;
                
                if (passwordField.value.length === 0) {
                    passwordElement.value?.focus();
                    return;
                }

                await logIn();
            },

            async onPasswordEnter() {
                if (passwordField.value.length === 0)
                    return;
                
                if (usernameField.value.length === 0) {
                    usernameElement.value?.focus();
                    return;
                }

                await logIn();
            },

            async onLogIn() {
                await logIn();
            },
        }
    },
});
</script>

<style lang="scss">
</style>