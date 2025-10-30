<script lang="ts">
    import { goto } from "$app/navigation";
    // import type { AdminGalleryModel, AdminGalleryCreateModel } from "@entities/gallery/model/admin-gallery";
    import { createGallery, updateGallery, deleteGallery } from "@entities/gallery/api/admin-gallery";
    import { tokenStore } from "@shared/stores/auth";
    import type { AdminGalleryModel, AdminGalleryCreateModel, AdminGalleryUpdateModel } from "@entities/gallery/model/types";
    import ImageUploader from "@shared/ui/uploaders/ImageUploader.svelte";
    import { PUBLIC_API } from "$env/static/public";
    import type { ImageModel } from "@entities/image/model";
    import { toast } from "svelte-sonner";
    import { zod4Client } from "sveltekit-superforms/adapters";
    import { adminGalleryCreateSchema, adminGalleryUpdateSchema } from "@entities/gallery/model/schema";
    import { superForm } from "sveltekit-superforms";
    import Button from "@shared/ui/button/button.svelte";
    import * as Form from "@shared/ui/form/index"
    import Input from "@shared/ui/input/input.svelte";
    import Switch from "@shared/ui/switch/switch.svelte";

    // export let gallery: AdminGalleryModel | undefined = undefined;
    //
    let {
      gallery,
      form,
    } = $props()
    let loadingState = $state(false)


    const sform = superForm(form, {
      validators: zod4Client(adminGalleryUpdateSchema)
    })

    const {form:formData, errors, validateForm} = sform;


    const handelSubmit = async (event: Event) => {
      if (!gallery?.id) {
          toast.error("Что-то пошло не так");
      }
      const validationResult = await validateForm()
      if (!validationResult.valid ) {
        errors.set(validationResult.errors)
        toast.error("Ошибка в заполнении формы")
        return
      }
      const payload: AdminGalleryUpdateModel = {
        ordering: $formData.ordering,
        published: $formData.published,
      }
      try {
          const res = await updateGallery(
              fetch,
              $tokenStore,
              gallery?.id,
              payload,
          );
      } catch (error) {
          toast.error(String(error));
          return;
      }
      toast.success("Успешно создано");
    };

    const deleteGalleryHandler = async () => {
        if (!gallery?.id) {
            toast.error("Что-то пошло не так");
        }
        try {
            const res = await deleteGallery(
                fetch,
                $tokenStore,
                gallery?.id,
            );
        } catch (error) {
            toast.error(String(error));
            return;
        }
        toast.success("Успешно создано");
        goto("/admin/gallery")
    }
</script>

    <div class="flex justify-between items-center my-5">
        {#if gallery}<h2>Изображение - {gallery.id}</h2>
            <Button onclick={deleteGalleryHandler}  variant = "destructive">Удалить</Button>

        {:else}
            <h2>Создание галереи</h2>
        {/if}
    </div>
    <!-- <h2 class="my-5">Контак</h2> -->
    <form onsubmit={handelSubmit} class="space-y-4">

        <img class="w-full h-auto" src={`${PUBLIC_API}${gallery.image.url}`} alt="изображение-{gallery.id}"/>
        <Form.Field form={sform} name="ordering">
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label>Порядок</Form.Label>
                <Input {...attrs} type="number" bind:value={$formData.ordering} />
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field form={sform} name="published">
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label>Опубликовать</Form.Label>
                <Switch {...attrs} bind:checked={$formData.published} />
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
        <Button type="submit">Сохранить</Button>

    </form>
