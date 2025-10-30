<script lang="ts">
  import { goto } from "$app/navigation";
  import { PUBLIC_API } from "$env/static/public";
  import { getGalleries } from "@entities/gallery/api/admin-gallery";
  import { tokenStore } from "@shared/stores/auth";
    import Button from "@shared/ui/button/button.svelte";
    import * as Table from "@shared/ui/table/index"
    import * as Empty from "@shared/ui/empty/index";
    import Checkbox from "@shared/ui/checkbox/checkbox.svelte";

  let {gallery} = $props()

  const LIMIT = 25;
  let hasMore = $state( gallery.length >= LIMIT);
  const loadMore = async () => {
    const currentItems = gallery.length;
    const res = await getGalleries(fetch, $tokenStore, {
      limit: LIMIT,
      offset: gallery.length,
    });
    gallery = [...gallery, ...res];
    if (gallery.length <= currentItems) {
      hasMore = false;
    }
  };
</script>

<div class="py-5">
  <div class="flex justify-between items-center">
    <h2 class="my-5">Галерея</h2>
    <Button
      href="/admin/gallery/create"
    >Создать</Button>
  </div>

  <div class="rounded-md border">
    <Table.Root>
      <Table.Header>
        <Table.Row>
            <Table.Head>ID</Table.Head>
            <Table.Head>Изображение</Table.Head>
            <Table.Head>Очередность</Table.Head>
            <Table.Head>Опубликован</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each gallery as item (item.id)}

            <Table.Row class="hover:bg-gray-300 cursor-pointer" onclick={() => goto(`/admin/gallery/${item.id}`)}>

                <Table.Cell>
                    {item.id}
                </Table.Cell>
                <Table.Cell>
                    <img
                      class="h-auto w-full max-w-50"
                      src={`${PUBLIC_API}${item.image.url}`}
                      alt="Галерея-{item.id}"
                    />
                </Table.Cell>
                <Table.Cell>
                    {item.ordering}
                </Table.Cell>
                <Table.Cell class="">
                    <Checkbox class="m-auto" disabled checked={item.published} />
                </Table.Cell>

            </Table.Row>

        {:else}
          <Table.Row>
            <Table.Cell colspan={4} class="text-center">
                <Empty.Root>
                  <Empty.Header>
                    <Empty.Title>В галерее ничего нет</Empty.Title>
                    <!-- <Empty.Description>Контакты не найдены</Empty.Description> -->
                  </Empty.Header>
                  <Empty.Content>
                    <Button
                        href="/admin/gallery/create"
                    >Создать</Button>
                  </Empty.Content>
                </Empty.Root>
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
  {#if gallery.length && hasMore}
  <div class="flex items-center justify-center space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onclick={() => loadMore()}
        disabled={!hasMore}
      >
          Еще
      </Button>
    </div>
{/if}
</div>
