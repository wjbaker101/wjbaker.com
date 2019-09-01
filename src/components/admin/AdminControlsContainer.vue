<template>
    <div class="admin-controls-container" v-if="isValidUser">
        <div class="admin-controls-content" :class="{ 'is-expanded': isExpanded }">
            <div class="admin-control" v-bind:key="index" v-for="(content, index) in contents">
                <ButtonComponent isIconButton="true" @click.native="content.action">
                    <Component v-bind:is="content.icon" />
                </ButtonComponent>
            </div>
        </div>
        <ButtonComponent isIconButton="true" :isNegative="isExpanded" @click.native="onExpandClick">
            <CogIcon v-if="!isExpanded"/>
            <CloseIcon v-else />
        </ButtonComponent>
    </div>
</template>

<script>
    import CogIcon from '@/assets/icons/cog.svg';
    import CloseIcon from '@/assets/icons/times.svg';

    import ButtonComponent from '@/components/ButtonComponent.vue';

    export default {
        name: 'AdminControlsContainer',

        props: ['contents', 'user'],

        components: {
            CogIcon,
            CloseIcon,
            ButtonComponent,
        },

        data() {
            return {
                isExpanded: false,
            }
        },

        computed: {
            isValidUser() {
                return this.user && this.user.isAdmin;
            },
        },

        methods: {
            onExpandClick() {
                this.isExpanded = !this.isExpanded;
            },
        },
    }
</script>

<style lang="scss">
    .admin-controls-container {
        position: fixed;
        bottom: 0;
        left: layout(aside-nav-width);
        padding: 1rem;
    }

    .admin-controls-content {
        opacity: 0;
        overflow: hidden;
        transition: opacity animation(duration-short);

        &.is-expanded {
            opacity: 1;
        }

        .admin-control {
            margin-bottom: 0.5rem;
        }
    }
</style>
