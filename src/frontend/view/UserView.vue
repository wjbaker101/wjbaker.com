<template>
    <PageContentComponent class="user-view" v-if="user !== null">
        <PageTitleComponent :title="user.username" />
        <p>
            <strong>User Created On:</strong>
            {{ creationDate }}
        </p>
        <p>
            <ButtonComponent @click="onLogout">Logout</ButtonComponent>
        </p>
    </PageContentComponent>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import { API } from '@frontend/api/API';
    import { DateUtils } from '@frontend/util/DateUtils';

    import { UserModel } from '@common/model/UserModel';

    import PageContentComponent from '@frontend/component/page/PageContentComponent.vue';
    import PageTitleComponent from '@frontend/component/page/PageTitleComponent.vue';
    import ButtonComponent from '@frontend/component/ButtonComponent.vue';

    @Component({
        components: {
            PageContentComponent,
            PageTitleComponent,
            ButtonComponent,
        },
    })
    export default class UserView extends Vue {

        get user(): UserModel {
            return this.$store.state.user;
        }

        get creationDate(): string {
            return DateUtils.fullDateTime(this.user.creationDate);
        }

        async onLogout(): Promise<void> {
            const result = await API.logout();

            if (result instanceof Error) {
                return;
            }

            this.$store.dispatch('setUser', null);
            this.$router.push({ path: '/user/login', });
        }
    }
</script>

<style lang="scss">
</style>
