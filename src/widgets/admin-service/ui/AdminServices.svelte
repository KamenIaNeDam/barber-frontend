<script lang="ts">
  import { goto } from "$app/navigation";
    import { getServices } from "@entities/service/api/admin-service";
  import { tokenStore } from "@shared/stores/auth";
    import Button from "@shared/ui/button/button.svelte";
    import * as Table from "@shared/ui/table/index"
    import * as Empty from "@shared/ui/empty/index";
    import Checkbox from "@shared/ui/checkbox/checkbox.svelte";

    let {services} = $props()

  const LIMIT = 25;
  let hasMore = $state(services.length >= LIMIT);
  const loadMore = async () => {
    const currentItems = services.length;
    const res = await getServices(fetch, $tokenStore, {
      limit: LIMIT,
      offset: services.length,
    });
    services = [...services, ...res];
    if (services.length <= currentItems) {
      hasMore = false;
    }
  };
</script>

<div class="py-5">
  <div class="flex justify-between items-center">
    <h2 class="my-5">Услуги</h2>
    <Button
      href="/admin/service/create"
    >Создать</Button>
  </div>

  <div class="rounded-md border">
    <Table.Root>
      <Table.Header>
        <Table.Row>
            <Table.Head>ID</Table.Head>
            <Table.Head>Название</Table.Head>
            <Table.Head>Цена</Table.Head>
            <Table.Head>Очередность</Table.Head>
            <Table.Head>Опубликован</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each services as item (item.id)}

            <Table.Row class="hover:bg-gray-300 cursor-pointer" onclick={() => goto(`/admin/service/${item.id}`)}>

                <Table.Cell>
                    {item.id}
                </Table.Cell>
                <Table.Cell>
                   {item.title}
                </Table.Cell>
                <Table.Cell>
                    {item.price}
                </Table.Cell>
                <Table.Cell>
                    {item.ordering}
                </Table.Cell>
                <Table.Cell>
                    <Checkbox class="m-auto"  checked={item.published} />
                </Table.Cell>

            </Table.Row>

        {:else}
          <Table.Row>
            <Table.Cell colspan={4} class="text-center">
                <Empty.Root>
                  <Empty.Header>
                    <Empty.Title>Ничего нет</Empty.Title>
                    <!-- <Empty.Description>Контакты не найдены</Empty.Description> -->
                  </Empty.Header>
                  <Empty.Content>
                    <Button
                        href="/admin/service/create"
                    >Создать</Button>
                  </Empty.Content>
                </Empty.Root>
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>

    {#if hasMore}
      <div class="flex justify-center items-center">
        <!-- <Button label="Еще" variant="secondary" onClick={loadMore} /> -->
        <Button onclick={loadMore}>Показать еще</Button>
      </div>
    {/if}
</div>
