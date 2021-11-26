<template>
    <PageContentComponent class="user-view" v-if="user !== null">
        <PageTitleComponent title="Your User" />
        <p>
            <strong>Username:</strong> {{ user.username }}
        </p>
        <p>
            <strong>Created:</strong> {{ displayCreatedAt }} ({{ displayCreatedAtDifference }})
        </p>
        <p>
            <strong>User Type:</strong> {{ displayUserType }}
        </p>
    </PageContentComponent>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import dayjs from 'dayjs';

import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/PageTitle.component.vue';

import { userClient } from '@/api/client/user/User.client';
import { userService } from '@/service/User.service';

import { User, UserType } from '@/model/User.model';

export default defineComponent({
    name: 'UserView',

    components: {
        PageContentComponent,
        PageTitleComponent,
    },

    setup() {
        const authDetails = userService.getAuthDetails();

        const user = ref<User | null>(null);

        const displayCreatedAt = computed<string>(() => user.value?.createdAt.format('DD/MM/YYYY') ?? '');
        const displayCreatedAtDifference = computed<string>(() => user.value?.createdAt.fromNow() ?? '');

        const displayUserType = computed<string>(() => {
            switch (user.value?.type) {
                case UserType.Unknown:
                    return 'Unknown';
                case UserType.Admin:
                    return 'Admin';
                case UserType.Basic:
                    return 'Basic';
                default:
                    return 'Unknown';
            }
        });

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
            user,
            displayCreatedAt,
            displayCreatedAtDifference,
            displayUserType,
        }
    },
});
</script>

<style lang="scss">
</style>