<template>
    <div class="page-content">
        <h1>
            <span class="page-heading">Website Components</span>
        </h1>
        <h2>Buttons</h2>
        <div class="component-container">
            <ButtonComponent>Default Button</ButtonComponent>
        </div>
        <div class="component-container">
            <ButtonComponent isLoading="true">Loading Button</ButtonComponent>
        </div>
        <div class="component-container">
            <ButtonComponent isGhostButton="true">Ghost Button</ButtonComponent>
        </div>
        <div class="component-container">
            <ButtonComponent disabled="true">Disabled Button</ButtonComponent>
        </div>
        <div class="component-container">
            <ButtonComponent>Consecutive</ButtonComponent>
            <ButtonComponent>Buttons</ButtonComponent>
        </div>
        <div class="component-container">
            <ButtonComponent isIconButton="true"><ArrowLeftIcon /></ButtonComponent>
        </div>
    </div>
</template>

<script>
    import ButtonComponent from '@/components/item/ButtonComponent.vue';

    import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';

    export default {
        name: 'ComponentsRoute',

        components: {
            ButtonComponent,

            ArrowLeftIcon,
        },
    }
</script>

<style lang="scss">
    .component-container + .component-container {
        margin-top: 1rem;
    }
</style>
