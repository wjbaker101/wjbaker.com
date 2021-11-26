<template>
    <PageContentComponent class="user-view">
        <PageTitleComponent title="Your User" />
        <p>
            <strong>Username:</strong> {{ user.username }}
        </p>
    </PageContentComponent>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import dayjs from 'dayjs';

import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/PageTitle.component.vue';

import { userClient } from '@/api/client/user/User.client';
import { userService } from '@/service/User.service';

import { User } from '@/model/User.model';

export default defineComponent({
    name: 'UserView',

    components: {
        PageContentComponent,
        PageTitleComponent,
    },

    setup() {
        const authDetails = userService.getAuthDetails();

        const user = ref<User | null>(null);

        onMounted(async () => {
            if (authDetails.value === null)
                return;

            const result = await userClient.getUserByReference(authDetails.value.user.reference);
            if (result instanceof Error) {
                return;
            }

            user.value = {
                reference: result.reference,
                username: result.username,
                createdAt: dayjs(result.createdAt),
                type: result.type,
            };
        });

        return {

        }
    },
});
</script>

<style lang="scss">
</style>