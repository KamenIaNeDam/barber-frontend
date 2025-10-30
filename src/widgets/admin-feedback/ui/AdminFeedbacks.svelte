<script lang="ts">
  import { goto } from "$app/navigation";
    import { getFeedbacks } from "@entities/feedback/api";
    import type { AdminFeedbackModel } from "@entities/feedback/model/types";
  import { tokenStore } from "@shared/stores/auth";
    import { Button } from "@shared/ui/button";
  import * as Table from "@shared/ui/table/index"
  import * as Empty from "@shared/ui/empty/index";
    import Checkbox from "@shared/ui/checkbox/checkbox.svelte";
  export let feedbacks: AdminFeedbackModel[] = [];

  const LIMIT = 25;
  let hasMore = feedbacks.length >= LIMIT;
  const loadMore = async () => {
    const currentItems = feedbacks.length;
    const res = await getFeedbacks(fetch, $tokenStore, {
      limit: LIMIT,
      offset: feedbacks.length,
    });
    feedbacks = [...feedbacks, ...res];
    if (feedbacks.length <= currentItems) {
      hasMore = false;
    }
  };
</script>

<div class="py-5">
  <div class="flex justify-between items-center">
    <h2 class="my-5">Обратная связь</h2>
  </div>
  <div class="rounded-md border">
    <Table.Root>
      <Table.Header>
        <Table.Row>
            <Table.Head>ID</Table.Head>
            <Table.Head>ФИО</Table.Head>
            <Table.Head>Контакт</Table.Head>
            <Table.Head>Дата создания</Table.Head>
            <Table.Head>Обработан</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each feedbacks as item (item.id)}

            <Table.Row class="hover:bg-gray-300 cursor-pointer" onclick={() => goto(`/admin/feedback/${item.id}`)}>

                <Table.Cell>
                    {item.id}
                </Table.Cell>
                <Table.Cell>
                   {item.fio}
                </Table.Cell>
                <Table.Cell>
                    {item.contact}
                </Table.Cell>
                <Table.Cell>
                    {item.created_at}
                </Table.Cell>
                <Table.Cell>
                    <Checkbox  checked={item.processed} />
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
                        href="/admin/feedback/create"
                    >Создать</Button>
                  </Empty.Content>
                </Empty.Root>
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
    {#if feedbacks.length && hasMore}
      <div class="flex justify-center items-center">
        <Button
            variant="outline"
            size="sm"
            onclick={loadMore}
            disabled={!hasMore}
        > Показать еще </Button>
      </div>
    {/if}
</div>
