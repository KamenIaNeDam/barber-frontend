<script lang="ts">
  import { getContacts } from "@entities/contact/api/admin-contact";
  import { tokenStore } from "@shared/stores/auth";
    import { Button } from "@shared/ui/button";
    import * as Table from "@shared/ui/table/index"
    import * as Empty from "@shared/ui/empty/index";
    import { goto } from "$app/navigation";

  let {contacts} = $props()

  const LIMIT = 25;
  let hasMore = $state( contacts.length >= LIMIT);
  const loadMore = async () => {
    const currentItems = contacts.length;
    const res = await getContacts(fetch, $tokenStore, {
      limit: LIMIT,
      offset: contacts.length,
    });
    contacts = [...contacts, ...res];
    if (contacts.length <= currentItems) {
      hasMore = false;
    }
  };
</script>

<div class="py-5">
  <div class="flex justify-between items-center">
    <h2 class="my-5">Контакты</h2>
    <Button
      href="/admin/contact/create"
    >Создать</Button>
  </div>
  <div class="rounded-md border">
    <Table.Root>
      <Table.Header>
        <Table.Row>
            <Table.Head>ID</Table.Head>
            <Table.Head>Название</Table.Head>
            <Table.Head>Значение</Table.Head>
            <Table.Head>Ссылка</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each contacts as contact (contact.id)}

            <Table.Row class="hover:bg-gray-300 cursor-pointer" onclick={() => goto(`/admin/contact/${contact.id}`)}>

                <Table.Cell>
                    {contact.id}
                </Table.Cell>
                <Table.Cell>
                    {contact.title}
                </Table.Cell>
                <Table.Cell>
                    {contact.value}
                </Table.Cell>
                <Table.Cell>
                    {contact.href}
                </Table.Cell>

            </Table.Row>

        {:else}
          <Table.Row>
            <Table.Cell colspan={4} class="text-center">
                <Empty.Root>
                  <Empty.Header>
                    <Empty.Title>Контакты не найдены</Empty.Title>
                    <!-- <Empty.Description>Контакты не найдены</Empty.Description> -->
                  </Empty.Header>
                  <Empty.Content>
                    <Button
                        href="/admin/contact/create"
                    >Создать</Button>
                  </Empty.Content>
                </Empty.Root>
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
  {#if contacts.length && hasMore}
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
