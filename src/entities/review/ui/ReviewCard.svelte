<script lang="ts">
    import type { Review } from "../model/review";
    export let review: Review;

    // helper to generate stars
    const stars = Array.from({ length: 5 }, (_, i) => i < review.rate);
</script>

<div class="w-full mx-auto" >
    <!-- Header with avatar and date -->
    <div class="flex items-center gap-4">
        <img
            src={review.avatar}
            alt="avatar"
            class="w-12 h-12 rounded-full object-cover"
        />
        <div>
            <div class="flex items-center">
                {#each stars as filled, i}
                    {#if filled}
                        <svg
                            class="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 
              3.967a1 1 0 00.95.69h4.18c.969 0 
              1.371 1.24.588 1.81l-3.385 
              2.46a1 1 0 00-.364 1.118l1.287 
              3.966c.3.922-.755 1.688-1.54 
              1.118l-3.385-2.46a1 1 0 
              00-1.176 0l-3.385 2.46c-.785.57-1.84-.196-1.54-1.118l1.287-3.966a1 1 
              0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 
              1 0 00.95-.69l1.286-3.967z"
                            />
                        </svg>
                    {:else}
                        <svg
                            class="w-5 h-5 text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 
              3.967a1 1 0 00.95.69h4.18c.969 0 
              1.371 1.24.588 1.81l-3.385 
              2.46a1 1 0 00-.364 1.118l1.287 
              3.966c.3.922-.755 1.688-1.54 
              1.118l-3.385-2.46a1 1 0 
              00-1.176 0l-3.385 2.46c-.785.57-1.84-.196-1.54-1.118l1.287-3.966a1 1 
              0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 
              1 0 00.95-.69l1.286-3.967z"
                            />
                        </svg>
                    {/if}
                {/each}
            </div>
            <p class="text-xs text-gray-500">{review.createdAt}</p>
        </div>
    </div>

    <!-- Review text -->
    <div class="h-full">
        <p class="text-gray-700 leading-relaxed">
            {review.text}
        </p>
    </div>
</div>
