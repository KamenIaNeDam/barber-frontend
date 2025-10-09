<script lang="ts">
    import { PUBLIC_API } from "$env/static/public";
    import type { GalleryModel } from "@entities/gallery/model/gallery";
    import { onMount } from "svelte";
    import Swiper from "swiper";
    import "swiper/css";
    import "swiper/css/navigation";
    import "swiper/css/pagination";


    import { Navigation, Pagination } from "swiper/modules";

    export let gallery: GalleryModel[] = []
    onMount(async () => {
        const swiper = new Swiper(".swiper", {
            modules: [Navigation, Pagination],
            loop: true,
            slidesPerView: 1, // default
            breakpoints: {
                640: { slidesPerView: 2, spaceBetween: 16 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    });
</script>
{#if gallery.length > 0}
<section id="galler" class="max-h-screen py-20">
    <h2 class="text-center">Работы</h2>
    <div class="swiper  mt-10">
        <div class="swiper-wrapper h-full">
            {#each gallery as item}
                <div
                    id="{String(item.id)}"
                    class="swiper-slide flex justify-center items-center h-full"
                >
                    <img
                        class="block sm:hidden mx-auto. w-full h-full object-contain"
                        src={`${PUBLIC_API}${item.image.url}`}
                        alt="Галерея"
                    />
                </div>
            {/each}
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</section>
{/if}

<style>
    .swiper-button-prev,
    .swiper-button-next {
        /* color: gray; */
        opacity: 0;
    }

    .swiper-button-prev:hover,
    .swiper-button-next:hover {
        color: gray;
        opacity: 1;
    }
    :global(.swiper-pagination-bullet) {
        width: 24px; /* size */
        height: 3px;
        background: gray; /* color */
        border-radius: 5%; /* remove rounding */
        opacity: 1;
    }
    :global(.swiper-pagination-bullet-active) {
        background: oklch(48.8% 0.243 264.376); /* active color */
        opacity: 1;
    }
</style>
