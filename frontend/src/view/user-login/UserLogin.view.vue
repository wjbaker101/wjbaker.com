<template>
    <PageContentComponent class="user-login-view">
        <PageTitleComponent title="Login" />
        <label>
            <strong>Username</strong>
            <input type="text" v-model="usernameField">
        </label>
        <p></p>
        <label>
            <strong>Password</strong>
            <input type="password" v-model="passwordField">
        </label>
        <p></p>
        <ButtonComponent @click="onLogIn">Log In</ButtonComponent>
        <ErrorComponent
            v-if="isError"
            message="Unable to log in; please refresh the page and try again."
        />
    </PageContentComponent>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/PageTitle.component.vue';
import ButtonComponent from '@/component/Button.component.vue';
import ErrorComponent from '@/component/Error.component.vue';

import { userService } from '@/service/User.service';

export default defineComponent({
    name: 'UserLoginView',

    components: {
        PageContentComponent,
        PageTitleComponent,
        ButtonComponent,
        ErrorComponent,
    },

    setup() {
        const usernameField = ref<string>('');
        const passwordField = ref<string>('');

        const isLoading = ref<boolean>(false);
        const isError = ref<boolean>(false);

        return {
            usernameField,
            passwordField,

            isLoading,
            isError,

            async onLogIn() {
                isLoading.value = true;
                isError.value = false;

                const result = await userService.logIn(usernameField.value, passwordField.value);
                if (result instanceof Error) {
                    isLoading.value = false;
                    isError.value = true;
                    return;
                }
            },
        }
    },
});
</script>

<style lang="scss">
</style>