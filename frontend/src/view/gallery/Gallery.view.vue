<template>
    <PageContentComponent class="gallery-view">
        <PageTitleComponent title="Gallery" />
        <UserMessageComponent :details="userMessage" />
        <div id="map" class="map" @mousedown="onMapClick">
            <div class="album-title" v-if="selectedAlbum.isVisible">
                <h2>{{ selectedAlbum.album?.title ?? '' }}</h2>
            </div>
            <div class="album-container flex flex-vertical" :class="{ 'is-visible': selectedAlbum.isVisible }" :style="{ top: `${selectedAlbum.positionY}px`, left: `${selectedAlbum.positionX}px` }">
                <img width="180" height="240" :src="selectedAlbum.album?.coverPhoto.imageUrl ?? ''">
            </div>
        </div>
    </PageContentComponent>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import * as mapbox from 'mapbox-gl';

import PageContentComponent from '@/component/layout/PageContent.component.vue';
import PageTitleComponent from '@/component/layout/PageTitle.component.vue';
import UserMessageComponent, { UserMessage } from '@/component/UserMessage.component.vue';
import ButtonComponent from '@/component/Button.component.vue';

import { galleryClient } from '@/api/client/gallery/Gallery.client';

import { Album } from '@/model/Album.model';

interface SelectedAlbum {
    isVisible: boolean;
    positionX: number;
    positionY: number;
    album: Album | null;
}

export default defineComponent({
    name: 'GalleryView',

    components: {
        PageContentComponent,
        PageTitleComponent,
        UserMessageComponent,
        ButtonComponent,
    },

    setup() {
        const albums = ref<Array<Album> | null>(null);
        const isLoading = ref<boolean>(false);

        const userMessage = ref<UserMessage>(UserMessage.none());

        const map = ref<mapbox.Map | null>(null);

        const selectedAlbum = ref<SelectedAlbum>({
            isVisible: false,
            positionX: 0,
            positionY: 0,
            album: null,
        });

        onMounted(async () => {
            map.value = new mapbox.Map({
                accessToken: 'pk.eyJ1Ijoid2piYWtlciIsImEiOiJja2Nqa3pucGwwcGx0MnVwNXd0MmY5MWtzIn0.UNpfJ_NQTiI_hnkw-KPnyQ',
                container: 'map',
                style: 'mapbox://styles/mapbox/outdoors-v11',
                center: {
                    lng: 31.806,
                    lat: 33.596,
                },
                zoom: 1.208,
            });

            isLoading.value = true;
            userMessage.value = UserMessage.none();

            // const result = await galleryClient.getAlbums();
            // if (result instanceof Error) {
            //     isLoading.value = false;
            //     userMessage.value = UserMessage.error(result.message || 'Unable to retrieve albums; please try refreshing the page.');
            //     return;
            // }

            // albums.value = result.albums.map(x => ({
            //     id: x.id,
            //     title: x.title,
            //     description: x.description,
            //     createdAt: dayjs(x.createdAt),
            //     photoCount: x.photoCount,
            //     coverPhoto: {
            //         latitude: x.coverPhoto.latitude,
            //         longitude: x.coverPhoto.longitude,
            //         imageUrl: x.coverPhoto.imageUrl,
            //     },
            // }));

            albums.value = [
                {
                    "id": "72157715112137831",
                    "title": "Beacon Hill 2019",
                    "description": "",
                    "createdAt": dayjs("2020-07-15T20:39:46"),
                    "photoCount": 2,
                    "coverPhoto": {
                        "latitude": 52.727222,
                        "longitude": -1.243056,
                        "imageUrl": "https://live.staticflickr.com/65535/50116339378_426d9166c4_m.jpg"
                    }
                },
                {
                    "id": "72157715066951188",
                    "title": "Taiwan 2019",
                    "description": "",
                    "createdAt": dayjs("2020-07-12T10:54:59"),
                    "photoCount": 18,
                    "coverPhoto": {
                        "latitude": 24.133611,
                        "longitude": 120.609722,
                        "imageUrl": "https://live.staticflickr.com/65535/50103826481_f1a526082f_m.jpg"
                    }
                }
            ];

            isLoading.value = false;
            userMessage.value = UserMessage.none();

            for (const album of albums.value) {
                const htmlElement = document.createElement('div');
                htmlElement.className = 'map-marker';
                htmlElement.innerHTML =
`<?xml version="1.0" encoding="UTF-8"?>
<svg width="48" height="48" class="svg-icon icon-camera-map-marker" aria-hidden="true" data-icon="camera" data-prefix="fas" focusable="false" role="img" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
<g transform="matrix(1.7837 0 0 1.7837 -657.24 -711.97)">
<path d="m512 401.52a110.48 110.48 0 0 0-110.48 110.48 110.48 110.48 0 0 0 67.711 101.66l42.516 70.191 43.668-70.434a110.48 110.48 0 0 0 67.062-101.42 110.48 110.48 0 0 0-110.48-110.48z" fill="#176bc0" fill-rule="evenodd" stroke="#000" stroke-linejoin="round" stroke-width="1"/>
<path d="m569.68 486.76v64.895c0 5.9713-4.8446 10.816-10.816 10.816h-93.738c-5.9713 0-10.816-4.8446-10.816-10.816v-64.895c0-5.9713 4.8446-10.816 10.816-10.816h19.829l2.7716-7.4134c1.5773-4.2137 5.6108-7.0078 10.117-7.0078h28.279c4.5066 0 8.5401 2.7941 10.117 7.0078l2.7941 7.4134h19.829c5.9713 0 10.816 4.8446 10.816 10.816zm-30.645 32.448c0-14.917-12.123-27.04-27.04-27.04s-27.04 12.123-27.04 27.04 12.123 27.04 27.04 27.04 27.04-12.123 27.04-27.04zm-7.2106 0c0 10.929-8.9006 19.829-19.829 19.829s-19.829-8.9006-19.829-19.829 8.9006-19.829 19.829-19.829 19.829 8.9006 19.829 19.829z" fill="#fff" stroke-width="0"/>
</g>
</svg>`;

                htmlElement.addEventListener('click', (event) => {
                    if (event.target !== htmlElement)
                        return;

                    if (selectedAlbum.value.isVisible && selectedAlbum.value.album?.id === album.id) {
                        selectedAlbum.value.isVisible = false;
                        return;
                    }

                    selectedAlbum.value = {
                        album,
                        isVisible: true,
                        positionX: event.x + 20,
                        positionY: event.y + 15,
                    };

                    event.stopImmediatePropagation();
                });

                new mapbox.Marker({
                    element: htmlElement,
                    anchor: 'bottom',
                })
                .setLngLat([ album.coverPhoto.longitude, album.coverPhoto.latitude ])
                .addTo(map.value);
            }
        });

        return {
            albums,
            userMessage,
            selectedAlbum,

            onMapClick() {
                selectedAlbum.value.isVisible = false;
            },
        }
    },
});
</script>

<style lang="scss">
@import 'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css';

.gallery-view {
    max-width: 1280px;

    .map {
        width: 100%;
        height: 700px;
        position: relative;
        border-radius: border-radius();
        overflow: hidden;
        box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.25), 1px 1px 6px rgba(0, 0, 0, 0.1);

        &:focus,
        & * {
            outline: none;
        }
    }

    .map-marker {
        cursor: pointer;

        svg {
            pointer-events: none;
        }
    }

    .album-title {
        padding: 1rem;
        position: absolute;
        left: 50%;
        top: 1rem;
        z-index: 10;
        transform: translateX(-50%);
        background-color: transparentize(theme(black), 0.4);
        border: 1px solid theme(black);
        border-radius: border-radius();

        h2 {
            margin: 0;
            line-height: 1em;
            color: theme(white);
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        }
    }

    .album-container {
        position: absolute;
        opacity: 0;
        background-color: theme(white);
        border-radius: border-radius();
        box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5), -1px -1px 6px rgba(0, 0, 0, 0.3);
        transform: rotate(5deg) scale(0.7);
        pointer-events: none;
        overflow: hidden;
        transition: opacity 0.2s, transform 0.2s ease-out;
        z-index: 10;

        &.is-visible {
            opacity: 1;
            pointer-events: all;
            transform: rotate(0) scale(1);
            animation: on-is-visible 0.4s;

            @keyframes on-is-visible {
                from {
                    transform: rotate(-5deg) scale(1.5) translateY(3rem);
                }

                to {
                    transform: rotate(0) scale(1) translateY(0);
                }
            }
        }

        img {
            vertical-align: middle;
        }
    }
}
</style>