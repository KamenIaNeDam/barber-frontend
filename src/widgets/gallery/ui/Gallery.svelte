<script lang="ts">
    import { onMount } from "svelte";
    import Swiper from "swiper";
    import "swiper/css";
    import "swiper/css/navigation";
    import "swiper/css/pagination";

    import { gallery } from "@entities/gallery/model/gallery";

    import { Navigation, Pagination } from "swiper/modules";
    onMount(async () => {
        const swiper = new Swiper(".swiper", {
            modules: [Navigation, Pagination],
            loop: true,
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

<section id="galler" class="w-full pt-20">
    <h2 class="text-center">Галерея</h2>
    <div class="swiper w-full h-full mt-10">
        <div class="swiper-wrapper max-h-screen">
            {#each gallery as item}
                <div class="swiper-slide flex justify-center items-center">
                    <img
                        class="block sm:hidden max-w-full h-auto mx-auto"
                        src={item.mobileImage}
                        alt={item.title}
                    />
                    <img
                        class="hidden sm:block max-w-full h-auto mx-auto"
                        src={item.desktopImage}
                        alt={item.title}
                    />
                </div>
            {/each}
            <!-- <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div> -->
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</section>

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
