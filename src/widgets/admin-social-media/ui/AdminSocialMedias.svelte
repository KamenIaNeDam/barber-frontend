<script lang="ts">
  import { goto } from "$app/navigation";
  import { getSocialMedias } from "@entities/social-media/api/admin-social-media";
  import { tokenStore } from "@shared/stores/auth";
    import Button from "@shared/ui/button/button.svelte";
  import * as Table from "@shared/ui/table/index"
  import * as Empty from "@shared/ui/empty/index";
    import Checkbox from "@shared/ui/checkbox/checkbox.svelte";
  let {contacts} = $props()

  const LIMIT = 25;
  let hasMore = $state(contacts.length >= LIMIT);
  const loadMore = async () => {
    const currentItems = contacts.length;
    const res = await getSocialMedias(fetch, $tokenStore, {
      limit: LIMIT,
      offset: contacts.length,
    });
    // contacts.concat(...res)
    contacts = [...contacts, ...res];
    if (contacts.length <= currentItems) {
      hasMore = false;
    }
  };
</script>

  <div class="flex justify-between items-center">
    <h2 class="my-5">Соц. сети</h2>
    <Button
      href="/admin/social-media/create"
    >Добавить</Button>
  </div>
  <div class="rounded-md border">
    <Table.Root>
      <Table.Header>
        <Table.Row>
            <Table.Head>ID</Table.Head>
            <Table.Head>Ссылка</Table.Head>
            <Table.Head>Тип</Table.Head>
            <Table.Head>Очередность</Table.Head>
            <Table.Head>Опубликован</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each contacts as item (item.id)}

            <Table.Row class="hover:bg-gray-300 cursor-pointer" onclick={() => goto(`/admin/social-media/${item.id}`)}>

                <Table.Cell>
                    {item.id}
                </Table.Cell>
                <Table.Cell>
                   {item.url}
                </Table.Cell>
                <Table.Cell>
                    {item.type}
                </Table.Cell>
                <Table.Cell>
                    {item.ordering}
                </Table.Cell>
                <Table.Cell>
                    <Checkbox disabled  checked={item.published} />
                </Table.Cell>

            </Table.Row>

        {:else}
          <Table.Row>
            <Table.Cell colspan={4} class="text-center">
                <Empty.Root>
                  <Empty.Header>
                    <Empty.Title>Ничего нет</Empty.Title>
                  </Empty.Header>
                  <Empty.Content>
                    <Button
                        href="/admin/social-media/create"
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
        <Button onclick={loadMore} >Показать еще</Button>
      </div>
    {/if}
