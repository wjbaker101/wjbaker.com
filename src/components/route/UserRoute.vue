<template>
    <div class="page-content">
        <div v-if="user">
            <h1>
                <img class="avatar-image" width="54" height="54" :src="avatarUrl">
                <span class="page-heading">{{ user.username }}</span>
            </h1>
            <p><strong>Created On:</strong> {{ createdOn }}</p>
            <p v-if="user.isAdmin">You are an Admin!</p>
            <FormContainerComponent title="Avatar">
                <p>Upload an image to use as your avatar.</p>
                <p>This will be visible when creating blog posts, as your name will appear at the bottom to show it was created by you!</p>
                <p>
                    <input
                        type="file"
                        @change="onAvatarUploadFileChange($event.target.name, $event.target.files)">
                </p>
                <p>
                    <ButtonComponent
                        @click.native="onAvatarUploadSubmit"
                        :doShowLoadingIcon="isAvatarUploading">

                        Submit
                    </ButtonComponent>
                    <ButtonComponent
                        isGhostButton="true">

                        Delete Avatar
                    </ButtonComponent>
                </p>
                <p v-if="avatarUploadMessage">{{ avatarUploadMessage }}</p>
            </FormContainerComponent>
            <FormContainerComponent title="Logout">
                <ButtonComponent
                    @click.native="onLogoutClicked"
                    :doShowLoadingIcon="isLoggingOut"
                    :isDisabled="isLoggedOut">

                    Log Out
                </ButtonComponent>
            </FormContainerComponent>
        </div>
    </div>
</template>

<script>
    import BaseRouteMixin from '@/mixin/BaseRouteMixin.js';
    import API from '@/api/API.js';
    import DateUtils from '@/util/DateUtils.js';
    import ButtonComponent from '@/components/item/ButtonComponent.vue';
    import FormContainerComponent from '@/components/item/FormContainerComponent.vue';
    import { ImmortalDB } from 'immortal-db';

    export default {
        name: 'UserRoute',

        mixins: [ BaseRouteMixin() ],

        components: {
            ButtonComponent,
            FormContainerComponent,
        },

        data() {
            return {
                user: null,

                isLoggingOut: false,
                isLoggedOut: false,

                avatarFile: null,
                isAvatarUploading: false,
                avatarUploadMessage: null,
                avatarUrl: null,
            }
        },

        computed: {
            createdOn: function() {
                if (!this.user) {
                    return '';
                }

                const date = new Date(this.user.createdOn);

                return DateUtils.formatDate(date);
            },
        },

        async beforeRouteEnter(to, from, next) {
            const response = await API.getUser();
            next(async vm => await vm.setPageUser(response));
        },

        async beforeRouteUpdate(to, from, next) {
            const response = await API.getUser();
            await this.setPageUser(response);
            next();
        },

        methods: {
            async setPageUser(response) {
                if (response.error) {
                    await ImmortalDB.remove('current-user');
                    this.$router.push('/login');
                    return;
                }

                this.user = response.result;
                this.avatarUrl = `/static-resources/images/${this.user.avatarID}`;
            },

            async onLogoutClicked() {
                this.isLoggingOut = true;
                const response = await API.logout();
                this.isLoggingOut = false;

                if (!response.error) {
                    this.isLoggedOut = true;
                    await ImmortalDB.remove('current-user');
                    this.$router.push('/login');
                }
            },

            onAvatarUploadFileChange(fieldName, fileList) {
                this.avatarFile = fileList[0];
            },

            async onAvatarUploadSubmit() {
                this.isAvatarUploading = true;

                const formData = new FormData();
                formData.append('avatar', this.avatarFile);

                const response = await API.uploadAvatar(formData);

                if (!response.error) {
                    this.avatarUrl = response.result;
                    this.avatarUploadMessage = 'Successfully updated avatar!';
                    setTimeout(() => (this.avatarUploadMessage = null), 3000);
                }
                else {
                    this.avatarUploadMessage = response.error;
                }

                this.isAvatarUploading = false;
            },
        },
    }
</script>

<style lang="scss">
    .avatar-image {
        margin-right: 1rem;
        vertical-align: middle;
        border-radius: 50%;
        line-height: 0;
    }
</style>
