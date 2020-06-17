<template>
    <div class="error-component">
        <ErrorCircleIcon />
        <div>
            <span>{{ message }}</span>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import ErrorCircleIcon from '@frontend/assets/icon/exclamation-circle.svg';

    @Component({
        components: {
            ErrorCircleIcon,
        },
    })
    export default class ErrorComponent extends Vue {

        @Prop({
            required: true,
        })
        private readonly message!: string;
    }
</script>

<style lang="scss">
    .error-component {
        display: flex;
        padding: 1rem;
        background-color: theme(negative-light);
        border: 1px solid theme(negative);
        border-radius: border-radius();
        color: theme(white);

        .icon-exclamation-circle {
            flex: 0 0 auto;
            margin: auto 1rem auto 0;
        }
    }
</style>
