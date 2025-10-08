<script lang="ts">
    import { goto } from "$app/navigation";
    // import type { AdminGalleryModel, AdminGalleryCreateModel } from "@entities/gallery/model/admin-gallery";
    import { createGallery, updateGallery, deleteGallery } from "@entities/gallery/api/admin-gallery";
    import { tokenStore } from "@shared/stores/auth";
    import Button from "@shared/ui/Button.svelte";
    import { addToast } from "@shared/ui/toast/store";
    import type { AdminGalleryModel, AdminGalleryCreateModel } from "@entities/gallery/model/gallery";
    import ImageUploader from "@shared/ui/uploaders/ImageUploader.svelte";
    import { PUBLIC_API } from "$env/static/public";
    import type { ImageModel } from "@entities/image/model";

    export let gallery: AdminGalleryModel | undefined = undefined;

    let payload: AdminGalleryCreateModel = {
        image_id: gallery?.image.id || 0,
        ordering: gallery?.ordering || 0,
        published: gallery?.published || false,
    };

    const handelSubmit = async () => {

        if (!gallery) {
            return await createGalleryHandler();
        }

        return await updateGalleryHandler();
    };

    const createGalleryHandler = async () => {
        if (payload.image_id === 0) {
            addToast("Проблема с изображением", "error")
            return
        }
        try {
            const res = await createGallery(fetch, $tokenStore, payload);
        } catch (error) {
            addToast(String(error), "error");
            return;
        }
        addToast("Успешно создано", "success");
    };

    const updateGalleryHandler = async () => {
        if (!gallery?.id) {
            addToast("Что-то пошло не так", "error");
        }
        try {
            const res = await updateGallery(
                fetch,
                $tokenStore,
                gallery?.id,
                payload,
            );
        } catch (error) {
            addToast(String(error), "error");
            return;
        }
        addToast("Успешно создано", "success");
    };

    const deleteGalleryHandler = async () => {
        if (!gallery?.id) {
            addToast("Что-то пошло не так", "error");
        }
        try {
            const res = await deleteGallery(
                fetch,
                $tokenStore,
                gallery?.id,
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
        {#if gallery}<h2>Галерея - {gallery.id}</h2>
        <Button onClick={deleteGalleryHandler} label="Удалить" variant = "secondary"/>

        {:else}
            <h2>Создание галереи</h2>
        {/if}
    </div>
    <!-- <h2 class="my-5">Контак</h2> -->
    <form on:submit={handelSubmit}>
        <div class="mb-4">
            <!-- <label class="block mb-1" for="title">Заголовок</label>
            <input
                id="title"
                name="title"
                type="text"
                class="w-full border px-3 py-2 rounded"
                bind:value={payload.image}
            /> -->
            <ImageUploader onUpload={(image: ImageModel) => {
                payload.image_id = image.id
            }}  previewUrl={gallery?.image && `${PUBLIC_API}${gallery.image.url}`}/>
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
            label="{gallery ? 'Сохранить': 'Создать'}"
            onClick={() => {}}
            type="submit"
            variant="secondary"
        />
    </form>
</div>
