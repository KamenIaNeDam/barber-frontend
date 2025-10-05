<script lang="ts">
  import { goto } from "$app/navigation";
  import { getContacts } from "@entities/contact/api/admin-contact";
  import type { AdminContactModel } from "@entities/contact/model/admin-contact";
  import { tokenStore } from "@shared/stores/auth";
  import Button from "@shared/ui/Button.svelte";

  export let contacts: AdminContactModel[] = [];

  const LIMIT = 25;
  let hasMore = contacts.length >= LIMIT;
  const loadMore = async () => {
    const currentItems = contacts.length;
    const res = await getContacts(fetch, $tokenStore, {
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
    <h2 class="my-5">Контакты</h2>
    <Button
      onClick={() => {
        goto("/admin/contact/create");
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
          <th class="px-4 py-2 text-left">Значение</th>
          <th class="px-4 py-2 text-left">Ссылка</th>
          <th class="px-4 py-2 text-left">Очередность</th>
          <th class="px-4 py-2 text-left">Опубликован</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        {#each contacts as contact}
          <tr
            class="hover:bg-gray-50 transition"
            on:click={() => {
              goto(`/admin/contact/${contact.id}`);
            }}
          >
            <td class="px-4 py-2">{contact.id}</td>
            <td class="px-4 py-2 font-medium text-gray-800">{contact.title}</td>
            <td class="px-4 py-2">{contact.value}</td>
            <td class="px-4 py-2 text-blue-600 truncate max-w-[200px]">
              {#if contact.href}
                <a href={contact.href} target="_blank" class="hover:underline">
                  {contact.href}
                </a>
              {:else}
                <span class="text-gray-400">-</span>
              {/if}
            </td>
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
