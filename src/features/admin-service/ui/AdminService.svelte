<script lang="ts">
    import { goto } from "$app/navigation";
    import type { AdminServiceModel, AdminServiceCreateModel } from "@entities/service/model/admin-service";
    import { createService, updateService, getServiceByID, deleteService } from "@entities/service/api/admin-service";
    import { tokenStore } from "@shared/stores/auth";
    import Button from "@shared/ui/Button.svelte";
    import { addToast } from "@shared/ui/toast/store";

    export let service: AdminServiceModel | undefined = undefined;

    let payload: AdminServiceCreateModel = {
        title: service?.title || "",
        price: service?.price || 0,
        ordering: service?.ordering || 0,
        published: service?.published || false,
    };

    const handelSubmit = async () => {

        if (!service) {
            return await createServiceHandler();
        }

        return await updateServiceHandler();
    };

    const createServiceHandler = async () => {
        try {
            const res = await createService(fetch, $tokenStore, payload);
        } catch (error) {
            addToast(String(error), "error");
            return;
        }
        addToast("Успешно создано", "success");
    };

    const updateServiceHandler = async () => {
        if (!service?.id) {
            addToast("Что-то пошло не так", "error");
        }
        try {
            const res = await updateService(
                fetch,
                $tokenStore,
                service?.id,
                payload,
            );
        } catch (error) {
            addToast(String(error), "error");
            return;
        }
        addToast("Успешно создано", "success");
    };

    const deleteServiceHandler = async () => {
        if (!service?.id) {
            addToast("Что-то пошло не так", "error");
        }
        try {
            const res = await deleteService(
                fetch,
                $tokenStore,
                service?.id,
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
        {#if service}<h2>Услуга - {service.id}</h2>
        <Button onClick={deleteServiceHandler} label="Удалить" variant = "secondary"/>

        {:else}
            <h2>Создание услуги</h2>
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
            <label class="block mb-1" for="price">Цена</label>
            <input
                id="price"
                name="price"
                type="number"
                class="w-full border px-3 py-2 rounded"
                bind:value={payload.price}
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
            label="{service ? 'Сохранить': 'Создать'}"
            onClick={() => {}}
            type="submit"
            variant="secondary"
        />
    </form>
</div>
