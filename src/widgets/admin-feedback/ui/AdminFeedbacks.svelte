<script lang="ts">
  import { goto } from "$app/navigation";
    import { getFeedbacks } from "@entities/feedback/api";
    import type { AdminFeedbackModel } from "@entities/feedback/model";
  import { tokenStore } from "@shared/stores/auth";
  import Button from "@shared/ui/Button.svelte";

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
    <Button
      onClick={() => {
        goto("/admin/feedback/create");
      }}
      variant="secondary"
      label="Добавить"
    />
  </div>

  <div class="overflow-x-auto w-full">
    <table class="table-auto min-w-full border-collapse rounded-lg shadow-sm">
      <thead class="bg-gray-100 text-gray-700 uppercase text-sm">
        <tr>
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">ФИО</th>
          <th class="px-4 py-2 text-left">Контакт</th>
          <th class="px-4 py-2 text-left">Дата создания</th>
          <th class="px-4 py-2 text-left">Обработан</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        {#each feedbacks as item}
          <tr
            class="hover:bg-gray-50 transition"
            on:click={() => {
              goto(`/admin/feedback/${item.id}`);
            }}
          >
            <td class="px-4 py-2">{item.id}</td>
            <!-- <td class="px-4 py-2 font-medium text-gray-800">{item.title}</td> -->
            <!-- <td class="px-4 py-2">{item.price}</td> -->
            <td class="px-4 py-2 text-left">{item.fio}</td>
            <td class="px-4 py-2 text-left">{item.contact}</td>
            <td class="px-4 py-2 text-left">{item.created_at}</td>
            <td class="px-4 py-2">
              {#if item.processed}
                <!-- <span class="inline-block px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full"> -->
                Да
                <!-- </span> -->
              {:else}
                <!-- <span class="inline-block px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full"> -->
                Нет
                <!-- </span> -->
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    {#if hasMore}
      <div class="flex justify-center items-center">
        <Button label="Еще" variant="secondary" onClick={loadMore} />
      </div>
    {/if}
  </div>
</div>
