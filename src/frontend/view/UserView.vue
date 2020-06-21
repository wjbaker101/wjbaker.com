<template>
    <PageContentComponent class="user-view">
        <PageTitleComponent :title="user.username" />
        <p>
            <strong>User Created On:</strong>
            {{ creationDate }}
        </p>
    </PageContentComponent>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import { DateUtils } from '@frontend/util/DateUtils';

    import { UserModel } from '@common/model/UserModel';

    import PageContentComponent from '@frontend/component/page/PageContentComponent.vue';
    import PageTitleComponent from '@frontend/component/page/PageTitleComponent.vue';

    @Component({
        components: {
            PageContentComponent,
            PageTitleComponent,
        },
    })
    export default class UserView extends Vue {

        get user(): UserModel {
            return this.$store.state.user;
        }

        get creationDate(): string {
            return DateUtils.fullDateTime(this.user.creationDate);
        }
    }
</script>

<style lang="scss">
</style>
