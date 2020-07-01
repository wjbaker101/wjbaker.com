<template>
    <div class="return-container-component flex">
        <div class="return flex-1">
            <router-link v-if="returnLink !== null" :to="returnLink">
                <LeftArrowIcon />{{ returnText }}
            </router-link>
        </div>
        <div class="actions flex flex-auto">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import LeftArrowIcon from '@frontend/assets/icon/arrow-left.svg';

    @Component({
        components: {
            LeftArrowIcon,
        },
    })
    export default class PageActionsComponent extends Vue {

        @Prop({
            default: null,
        })
        private readonly returnLink!: string | null;

        @Prop()
        private readonly returnText!: string;
    }
</script>

<style lang="scss">
    .return-container-component {
        padding: 1rem;
        margin-bottom: 2rem;
        border: 1px solid theme(secondary);
        border-radius: border-radius();

        .return {
            margin: auto 0;

            .svg-icon {
                margin-right: 0.25rem;
            }
        }

        .actions {
            & > * {
                margin: auto 0 auto 0.5rem;
            }
        }
    }
</style>
