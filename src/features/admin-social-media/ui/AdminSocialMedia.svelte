<script lang="ts">
    import { goto } from "$app/navigation";
    import {
        createSocialMedia,
        deleteSocialMedia,
        updateSocialMedia,
    } from "@entities/social-media/api/admin-social-media";
    import type {
        AdminSocialMediaCreateModel,
        AdminSocialMediaModel,
    } from "@entities/social-media/model/admin-social-media";
    import { MediaType } from "@entities/social-media/model/socia-media";
    import { tokenStore } from "@shared/stores/auth";
    import Button from "@shared/ui/Button.svelte";
    import { addToast } from "@shared/ui/toast/store";

    export let contact: AdminSocialMediaModel | undefined = undefined;

    let payload: AdminSocialMediaCreateModel = {
        url: contact?.url || "",
        type: contact?.type || MediaType.VK,
        ordering: contact?.ordering || 0,
        published: contact?.published || false,
    };

    const handelSubmit = async () => {
        if (!contact) {
            return await createSocialMediaHandler();
        }

        return await updateSocialMediaHandler();
    };

    const createSocialMediaHandler = async () => {
        try {
            const res = await createSocialMedia(fetch, $tokenStore, payload);
        } catch (error) {
            addToast(String(error), "error");
            return;
        }
        addToast("Успешно создано", "success");
    };

    const updateSocialMediaHandler = async () => {
        if (!contact?.id) {
            addToast("Что-то пошло не так", "error");
        }
        try {
            const res = await updateSocialMedia(
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

    const deleteSocialMediaHandler = async () => {
        if (!contact?.id) {
            addToast("Что-то пошло не так", "error");
        }
        try {
            const res = await deleteSocialMedia(
                fetch,
                $tokenStore,
                contact?.id,
            );
        } catch (error) {
            addToast(String(error), "error");
            return;
        }
        addToast("Успешно создано", "success");
        goto("/admin");
    };
</script>

<div class="p-5">
    <div class="flex justify-between items-center my-5">
        {#if contact}<h2>Сиц. сеть - {contact.id}</h2>
            <Button
                onClick={deleteSocialMediaHandler}
                label="Удалить"
                variant="secondary"
            />
        {:else}
            <h2>Создание соц. сети</h2>
        {/if}
    </div>
    <!-- <h2 class="my-5">Контак</h2> -->
    <form on:submit={handelSubmit}>
        <div class="mb-4">
            <label class="block mb-1" for="title">Ссылка</label>
            <input
                id="title"
                name="title"
                type="text"
                class="w-full border px-3 py-2 rounded"
                bind:value={payload.url}
            />
        </div>

        <div class="mb-4">
            <label class="block mb-1" for="type">Тип</label>
            <select id="type" name="type" bind:value={payload.type}>
                {#each Object.entries(MediaType) as [k,v]}
                    <option value="{v}">{k}</option>
                {/each}
            </select>
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
            label={contact ? "Сохранить" : "Создать"}
            onClick={() => {}}
            type="submit"
            variant="secondary"
        />
    </form>
</div>
