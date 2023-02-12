<template>
    <div class="page-content-component">
        <div class="content">
            <Slot></Slot>
        </div>
        <FooterComponent />
    </div>
</template>

<script setup lang="ts">
import FooterComponent from '@/component/layout/Footer.component.vue';
</script>

<style lang="scss">
.page-content-component {
    max-width: 720px;
    margin: 8rem auto 1rem auto;

    @media screen and (max-width: breakpoint()) {
        margin-top: 0;
    }

    .content {
        padding: 2rem;
        background-color: theme(white);
        border: 1px solid theme(grey);
        border-radius: border-radius();

        h2, h3, h4, h5, h6 {
            text-shadow: none;
            color: theme(black);
        }

        p, h2, h3, h4, h5, h6 {
            max-width: 32rem;
            margin-right: auto;
            margin-left: auto;
        }
    }

    & > :first-child {
        margin-top: 0;
    }

    & > :last-child {
        margin-bottom: 0;
    }

    a {
        color: theme(primary);
        font-weight: bold;
        text-decoration: underline;

        &:hover {
            text-decoration: none;
        }
    }
}
</style>