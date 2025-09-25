<script lang="ts">
    import { reviews } from "@entities/review/model/review";
    import ReviewCard from "@entities/review/ui/ReviewCard.svelte";
    import { onMount } from "svelte";

    import Swiper from "swiper";
    import "swiper/css";
    import "swiper/css/navigation";
    import "swiper/css/pagination";

    import { Navigation, Pagination } from "swiper/modules";
    onMount(async () => {
        const swiper = new Swiper(".swiper-review", {
            modules: [Navigation, Pagination],
            loop: true,
            navigation: {
                nextEl: ".swiper-review-button-next",
                prevEl: ".swiper-review-button-prev",
            },
            pagination: {
                el: ".swiper-review-pagination",
                clickable: true,
            },
        });
    });
</script>

<section id="review" class=" w-full py-20 px-5">
    <h2 class="text-center">Отзывы</h2>
    <div class="swiper swiper-review max-w-lg mt-10 bg-white rounded-2xl shadow space-y-4">
        <div class="swiper-wrapper swiper-review-wrapper max-h-screen">
            {#each reviews as item}
                <div
                    class="swiper-slide swiper-review-slide w-full  p-10"
                >
                    <ReviewCard review={item} />
                </div>
            {/each}
        </div>

        <div class="swiper-pagination swiper-review-pagination"></div>
        <div class="swiper-button-prev swiper-review-button-prev"></div>
        <div class="swiper-button-next swiper-review-button-next"></div>
    </div>
</section>

<style>
    .swiper-review-button-prev,
    .swiper-review-button-next {
        /* color: gray; */
        opacity: 0;
    }

    .swiper-review-button-prev:hover,
    .swiper-review-button-next:hover {
        color: gray;
        opacity: 1;
    }
    :global(.swiper-review-pagination-bullet) {
        width: 24px; /* size */
        height: 3px;
        background: gray; /* color */
        border-radius: 5%; /* remove rounding */
        opacity: 1;
    }
    :global(.swiper-review-pagination-bullet-active) {
        background: oklch(48.8% 0.243 264.376); /* active color */
        opacity: 1;
    }
</style>
