<script lang="ts">
  import { goto } from "$app/navigation";
    import { getServices } from "@entities/service/api/admin-service";
    import type { AdminServiceModel } from "@entities/service/model/admin-service";
  import { tokenStore } from "@shared/stores/auth";
  import Button from "@shared/ui/Button.svelte";

  export let services: AdminServiceModel[] = [];

  const LIMIT = 25;
  let hasMore = services.length >= LIMIT;
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
      onClick={() => {
        goto("/admin/service/create");
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
          <th class="px-4 py-2 text-left">Название</th>
          <th class="px-4 py-2 text-left">Цена</th>
          <th class="px-4 py-2 text-left">Очередность</th>
          <th class="px-4 py-2 text-left">Опубликован</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        {#each services as item}
          <tr
            class="hover:bg-gray-50 transition"
            on:click={() => {
              goto(`/admin/service/${item.id}`);
            }}
          >
            <td class="px-4 py-2">{item.id}</td>
            <td class="px-4 py-2 font-medium text-gray-800">{item.title}</td>
            <td class="px-4 py-2">{item.price}</td>
            <td class="px-4 py-2 text-center">{item.ordering}</td>
            <td class="px-4 py-2">
              {#if item.published}
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
