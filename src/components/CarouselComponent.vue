<template>
    <div class="carousel-container">
        <div class="navigation-left" v-on:click="onLeft">
            <LeftArrow />
        </div>
        <div class="navigation-right" v-on:click="onRight">
            <RightArrow />
        </div>

        <img class="carousel-image" :src="currentImage">
    </div>
</template>

<script>
    import LeftArrow from '@/assets/icons/arrow-left.svg';
    import RightArrow from '@/assets/icons/arrow-right.svg';

    export default {
        name: 'CarouselComponent',

        components: {
            LeftArrow,
            RightArrow,
        },

        props: [ 'images' ],

        data() {
            return {
                currentIndex: 0,
            }
        },

        computed: {
            currentImage: function() {
                return `https://wjbaker.com/projects/assets/${this.currentIndex}/screenshot.jpg`;
            },
        },

        methods: {
            onLeft() {
                this.incrementIndex(-1);
            },

            onRight() {
                this.incrementIndex(1);
            },

            incrementIndex(value = 1) {
                if (this.currentIndex + value > 0
                    || this.currentIndex + value < 10) {

                    this.currentIndex += value;
                    console.log(this.currentIndex);
                }
            },
        }
    }
</script>

<style lang="scss">
    .carousel-container {
        display: flex;
        position: relative;
        padding: 1rem;
        margin: 3rem -2rem;
        background-color: theme(primary-light);
        border-top: 1px solid theme(primary);
        border-bottom: 1px solid theme(primary);

        .navigation-left,
        .navigation-right {
            width: 25%;
            position: absolute;
            display: flex;
            top: 0;
            bottom: 0;
            cursor: pointer;
            opacity: 0.1;
            transition: opacity 0.2s;

            &:hover {
                opacity: 1;
            }

            & > * {
                margin: auto;
                color: theme(tertiary);
            }
        }

        .navigation-left {
            left: 0;
        }

        .navigation-right {
            right: 0;
        }
    }

    .carousel-image {
        margin: auto;
    }
</style>
