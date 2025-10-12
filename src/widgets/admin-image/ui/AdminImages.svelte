<script lang="ts">
    import { PUBLIC_API } from "$env/static/public";
import { getImages } from "@entities/image/api";
    import type { ImageModel } from "@entities/image/model";
    import { tokenStore } from "@shared/stores/auth";
    import Button from "@shared/ui/Button.svelte";
    import { onMount } from "svelte";

    const LIMIT = 6
  let images: ImageModel[] = []
  let hasMore =  true


  onMount( () => {
    loadMore()
  })

  const loadMore = async () => {
    const currentItems = images.length;
    const res = await getImages(fetch, $tokenStore, {
      limit: LIMIT,
      offset: images.length
    })
    images = [...images, ...res]
    if (images.length <= currentItems) {
      hasMore = false;
    }
  }


</script>

<div class="py-5">
<h1>Загруженные изображения: ({images.length})</h1>
<div class="grid grid-cols-3 gap-2 w-full">
    {#each Array.from({ length: 3 }, (_, i) => i) as n }
        <div class="flex flex-col gap-2">
            {#each images.filter((item, i) => (i)%3 === n  && item) as image}
                <div>
                    <img class="w-full h-auto" src="{`${PUBLIC_API}${image.url}`}" alt="{`${image.id}`}"/>
                </div>
            {/each}
        </div>
	{/each}
</div>
{#if hasMore}
  <div class="flex justify-center items-center">
    <Button label="Еще" variant="secondary" onClick={loadMore} />
  </div>
{/if}
</div>
