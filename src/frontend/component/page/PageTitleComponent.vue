<template>
    <div class="page-title-component">
        <div class="text flex">
            <div>
                <h1>{{ title }}</h1>
                <h6 v-if="subheading">{{ subheading }}</h6>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({
        components: {},
    })
    export default class PageTitleComponent extends Vue {

        @Prop({
            required: true,
        })
        private readonly title!: string;

        @Prop()
        private readonly subheading!: string;
    }
</script>

<style lang="scss">
    .page-title-component {
        width: 100%;
        max-width: 600px;
        display: table;
        margin: 0 auto 2rem auto;
        position: relative;
        text-align: center;

        .text {
            height: 214px;
            flex-direction: column;
            position: relative;
            margin: 0 4rem 4rem 0;
            background-color: theme(primary);
            border: 1px solid theme(primary-dark);
            border-radius: border-radius();
            color: theme(white);
            z-index: 1;

            @media screen and (max-width: breakpoint-small()) {
                height: 150px;
                margin: 0 2rem 2rem 0;

                h1 {
                    font-size: 2rem;
                }

                h6 {
                    font-size: 1rem;
                }
            }

            & > div {
                margin: auto;
            }
        }

        h1 {
            margin: auto;
            padding: 0 2rem;
            animation: title-load animation(duration-mid);
        }

        h6 {
            margin: auto;
            margin-top: 0.5rem;
            animation: subheading-load animation(duration-long);
        }

        &::after {
            content: '';
            position: absolute;
            top: 4rem;
            left: 4rem;
            bottom: 0;
            right: 0;
            background-color: theme(grey);
            border: 1px solid theme(grey-dark);
            border-radius: border-radius();
        }

        @keyframes title-load {
            from {
                opacity: 0;
                transform: translateX(-4rem);
            }

            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes subheading-load {
            from {
                opacity: 0;
                transform: translateX(4rem);
            }

            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    }
</style>
