<template>
    <PageContentComponent class="error-not-found-view">
        <PageTitleComponent title="Page Not Found" />
        <UserMessageComponent :details="{
            isVisible: true,
            type: 'error',
            message: 'The page you were looking for could not be found.',
        }" />
        <p>
            <router-link to="/">
                <ButtonComponent>Return to Homepage</ButtonComponent>
            </router-link>
        </p>
    </PageContentComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/layout/PageTitle.component.vue';
import ButtonComponent from '@/component/Button.component.vue';
import UserMessageComponent from '@/component/UserMessage.component.vue';

export default defineComponent({
    name: 'NotFoundView',

    components: {
        PageContentComponent,
        PageTitleComponent,
        ButtonComponent,
        UserMessageComponent,
    },

    setup() {},
});
</script>

<style lang="scss">
</style>