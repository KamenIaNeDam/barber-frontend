<script lang="ts">
    import { goto } from "$app/navigation";
    import {
        createContact,
        deleteContact,
        updateContact,
    } from "@entities/contact/api/admin-contact";
    import type {
        AdminContactCreateModel,
        AdminContactModel,
    } from "@entities/contact/model/admin-contact";
    import { tokenStore } from "@shared/stores/auth";
    import Button from "@shared/ui/Button.svelte";
    import { addToast } from "@shared/ui/toast/store";

    export let contact: AdminContactModel | undefined = undefined;

    let payload: AdminContactCreateModel = {
        title: contact?.title || "",
        value: contact?.value || "",
        href: contact?.href || "",
        ordering: contact?.ordering || 0,
        published: contact?.published || false,
    };

    const handelSubmit = async () => {
        if (payload.href === "") {
            payload.href = undefined;
        }

        if (!contact) {
            return await createContactHandler();
        }

        return await updateContactHandler();
    };

    const createContactHandler = async () => {
        try {
            const res = await createContact(fetch, $tokenStore, payload);
        } catch (error) {
            addToast(String(error), "error");
            return;
        }
        addToast("Успешно создано", "success");
    };

    const updateContactHandler = async () => {
        if (!contact?.id) {
            addToast("Что-то пошло не так", "error");
        }
        try {
            const res = await updateContact(
                fetch,
                $tokenStore,
                contact?.id,
                payload,
            );
        } catch (error) {
            addToast(String(error), "error");
            return;
        }
        addToast("Успешно создано", "success");
    };

    const deleteContactHandler = async () => {
        if (!contact?.id) {
            addToast("Что-то пошло не так", "error");
        }
        try {
            const res = await deleteContact(
                fetch,
                $tokenStore,
                contact?.id,
            );
        } catch (error) {
            addToast(String(error), "error");
            return;
        }
        addToast("Успешно создано", "success");
        goto("/admin")
    }
</script>

<div class="p-5">
    <div class="flex justify-between items-center my-5">
        {#if contact}<h2>Контакт - {contact.id}</h2>
        <Button onClick={deleteContactHandler} label="Удалить" variant = "secondary"/>

        {:else}
            <h2>Создание контакта</h2>
        {/if}
    </div>
    <!-- <h2 class="my-5">Контак</h2> -->
    <form on:submit={handelSubmit}>
        <div class="mb-4">
            <label class="block mb-1" for="title">Заголовок</label>
            <input
                id="title"
                name="title"
                type="text"
                class="w-full border px-3 py-2 rounded"
                bind:value={payload.title}
            />
        </div>

        <div class="mb-4">
            <label class="block mb-1" for="value">Значение</label>
            <input
                id="value"
                name="value"
                type="text"
                class="w-full border px-3 py-2 rounded"
                bind:value={payload.value}
            />
        </div>

        <div class="mb-4">
            <label class="block mb-1" for="href">Ссылка</label>
            <input
                id="href"
                name="href"
                type="text"
                class="w-full border px-3 py-2 rounded"
                bind:value={payload.href}
            />
        </div>
        <div class="mb-4">
            <label class="block mb-1" for="ordering">Сортировка</label>
            <input
                id="ordering"
                name="ordering"
                type="number"
                class="w-full border px-3 py-2 rounded"
                bind:value={payload.ordering}
            />
        </div>
        <div class="mb-4">
            <label class="block mb-1" for="published">Опубликован</label>
            <input
                id="published"
                name="published"
                type="checkbox"
                class="w-full border px-3 py-2 rounded"
                bind:checked={payload.published}
            />
        </div>
        <Button
            label="{contact ? 'Сохранить': 'Создать'}"
            onClick={() => {}}
            type="submit"
            variant="secondary"
        />
    </form>
</div>
