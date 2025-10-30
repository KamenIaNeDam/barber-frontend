<script lang="ts">
    import { goto } from "$app/navigation";
    // import type { AdminGalleryModel, AdminGalleryCreateModel } from "@entities/gallery/model/admin-gallery";
    import { createGallery, updateGallery, deleteGallery } from "@entities/gallery/api/admin-gallery";
    import { tokenStore } from "@shared/stores/auth";
    import type { AdminGalleryModel, AdminGalleryCreateModel } from "@entities/gallery/model/types";
    import ImageUploader from "@shared/ui/uploaders/ImageUploader.svelte";
    import { PUBLIC_API } from "$env/static/public";
    import type { ImageModel } from "@entities/image/model";
    import { toast } from "svelte-sonner";
    import { zod4Client } from "sveltekit-superforms/adapters";
    import { adminGalleryCreateSchema } from "@entities/gallery/model/schema";
    import { superForm } from "sveltekit-superforms";
    import * as Form from "@shared/ui/form/index"
    import Button from "@shared/ui/button/button.svelte";
    import Switch from "@shared/ui/switch/switch.svelte";
    import Input from "@shared/ui/input/input.svelte";

    let {
      form,
    } = $props()

    let preview = $state("")


    const sform = superForm(form, {
      validators: zod4Client(adminGalleryCreateSchema)
    })

    const {form:formData, errors, validateForm} = sform;

    const handelSubmit = async (event: Event) => {
      event.preventDefault()
      const validationResult = await validateForm()
      if (!validationResult.valid ) {
        errors.set(validationResult.errors)
        toast.error("Ошибка в заполнении формы")
        return
      }
      const payload: AdminGalleryCreateModel = {
        image_id: $formData.image_id,
        ordering: $formData.ordering,
        published: $formData.published,
      }
      try {
          const res = await createGallery(fetch, $tokenStore, payload);
      } catch (error) {
          toast.error(String(error));
          return;
      }
      toast.success("Успешно создано");
      goto('/admin/gallery')
    };

</script>

    <div class="flex justify-between items-center my-5">

            <h2>Создание галереи</h2>
    </div>
    <!-- <h2 class="my-5">Контак</h2> -->
    <form onsubmit={handelSubmit} class="space-y-4">
        <Form.Field form={sform} name="image_id">
        <Form.Control>
            {#snippet children(attrs)}
            <ImageUploader onUpload={(image: ImageModel) => {
                $formData.image_id = image.id
                preview = `${PUBLIC_API}${image.url}`
            }}  previewUrl={preview} {...attrs}/>
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
            </Form.Field>

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
        <Button type="submit">Создать</Button>
    </form>
