<template>
    <PageContentComponent class="user-view">
        <PageTitleComponent title="Your User" />
        <div v-if="isLoading">
            <LoadingComponent message="Loading Your User Details" />
        </div>
        <UserMessageComponent :details="userMessage" />
        <div v-if="user !== null">
            <p>
                <strong>Username:</strong> {{ user.username }}
            </p>
            <p>
                <strong>Created:</strong> {{ displayCreatedAt }} ({{ displayCreatedAtDifference }})
            </p>
            <p>
                <strong>User Type:</strong> {{ displayUserType }}
            </p>
            <ButtonComponent @click="onLogOut">Log Out</ButtonComponent>
        </div>
    </PageContentComponent>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';

import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/layout/PageTitle.component.vue';
import ButtonComponent from '@/component/Button.component.vue';
import LoadingComponent from '@/component/Loading.component.vue';
import UserMessageComponent, { UserMessage } from '@/component/UserMessage.component.vue';

import { userClient } from '@/api/client/user/User.client';
import { userService } from '@/service/user/User.service';

import { User, UserType } from '@/model/User.model';

export default defineComponent({
    name: 'UserView',

    components: {
        PageContentComponent,
        PageTitleComponent,
        ButtonComponent,
        LoadingComponent,
        UserMessageComponent,
    },

    setup() {
        const router = useRouter();

        const authDetails = userService.getAuthDetails();

        const user = ref<User | null>(null);
        const isLoading = ref<boolean>(false);

        const userMessage = ref<UserMessage>(UserMessage.none());

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
            if (authDetails.value === null) {
                userMessage.value = UserMessage.error('You must be logged in to view your user details.');
                return;
            }

            isLoading.value = true;
            userMessage.value = UserMessage.none();

            const result = await userClient.getUserByReference(authDetails.value.user.reference);
            if (result instanceof Error) {
                isLoading.value = false;
                userMessage.value = UserMessage.error(result.message || 'Unable to retrieve your user details; please try refreshing the page.');
                return;
            }

            user.value = {
                reference: result.reference,
                username: result.username,
                createdAt: dayjs(result.createdAt),
                type: result.type,
            };

            isLoading.value = false;
            userMessage.value = UserMessage.none();
        });

        return {
            user,
            isLoading,
            userMessage,
            displayCreatedAt,
            displayCreatedAtDifference,
            displayUserType,

            async onLogOut() {
                await userService.logOut();

                router.push({
                    path: '/user/login',
                });
            },
        }
    },
});
</script>

<style lang="scss">
</style>