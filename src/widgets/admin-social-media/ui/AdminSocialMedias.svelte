<script lang="ts">
  import { goto } from "$app/navigation";
  import { getSocialMedias } from "@entities/social-media/api/admin-social-media";
  import type { AdminSocialMediaModel } from "@entities/social-media/model/admin-social-media";
  import { tokenStore } from "@shared/stores/auth";
  import Button from "@shared/ui/Button.svelte";

  export let contacts: AdminSocialMediaModel[] = [];

  const LIMIT = 25;
  let hasMore = contacts.length >= LIMIT;
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

<div class="py-5">
  <div class="flex justify-between items-center">
    <h2 class="my-5">Соц. сети</h2>
    <Button
      onClick={() => {
        goto("/admin/social-media/create");
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
          <th class="px-4 py-2 text-left">Ссылка</th>
          <th class="px-4 py-2 text-left">Тип</th>
          <th class="px-4 py-2 text-left">Очередность</th>
          <th class="px-4 py-2 text-left">Опубликован</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        {#each contacts as contact}
          <tr
            class="hover:bg-gray-50 transition"
            on:click={() => {
              goto(`/admin/social-media/${contact.id}`);
            }}
          >
            <td class="px-4 py-2">{contact.id}</td>
            <td class="px-4 py-2 font-medium text-gray-800">{contact.url}</td>
            <td class="px-4 py-2">{contact.type}</td>
            <td class="px-4 py-2 text-center">{contact.ordering}</td>
            <td class="px-4 py-2">
              {#if contact.published}
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
