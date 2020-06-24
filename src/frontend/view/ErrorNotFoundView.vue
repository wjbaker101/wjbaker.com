<template>
    <PageContentComponent class="error-not-found-view">
        <PageTitleComponent title="Page Not Found" />
        <ErrorComponent message="The page you were looking for could not be found." />
        <p>
            <router-link to="/">
                <ButtonComponent>Return to Homepage</ButtonComponent>
            </router-link>
        </p>
    </PageContentComponent>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import PageContentComponent from '@frontend/component/page/PageContentComponent.vue';
    import PageTitleComponent from '@frontend/component/page/PageTitleComponent.vue';

    import ButtonComponent from '@frontend/component/ButtonComponent.vue';
    import ErrorComponent from '@frontend/component/ErrorComponent.vue';

    @Component({
        components: {
            PageContentComponent,
            PageTitleComponent,
            ButtonComponent,
            ErrorComponent,
        },
    })
    export default class ErrorNotFoundView extends Vue {
    }
</script>

<style lang="scss">
</style>
