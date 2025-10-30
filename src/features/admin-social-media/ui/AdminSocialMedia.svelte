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
    } from "@entities/social-media/model/types";
    import { adminSocialMediaSchema, type AdminSocialMediaSchema } from "@entities/social-media/model/schema";
    import { MediaType } from "@entities/social-media/model/types";
    import { tokenStore } from "@shared/stores/auth";
    import { toast } from "svelte-sonner";
    import { superForm, type SuperValidated } from "sveltekit-superforms";
    import { zod4Client } from "sveltekit-superforms/adapters";
    import Button from "@shared/ui/button/button.svelte";
    import * as Form from "@shared/ui/form/index"
    import * as Select from "@shared/ui/select/index"
    import Input from "@shared/ui/input/input.svelte";
    import Switch from "@shared/ui/switch/switch.svelte";

    interface AdminSocialMediaProps {
      socialMedia?: AdminSocialMediaModel,
      form: SuperValidated<AdminSocialMediaSchema>
    }

    let {
      socialMedia = undefined,
      form,
    }: AdminSocialMediaProps = $props()

    const sform = superForm(form, {
        validators: zod4Client(adminSocialMediaSchema),
    });

    const { form: formData, errors, validateForm } = sform;

    const handelSubmit = async (event: Event) => {
      event.preventDefault()
      const validationResult = await validateForm()

      if (!validationResult.valid ) {
        errors.set(validationResult.errors)
        toast.error("Ошибка в заполнении формы")
        return
      }
      const payload: AdminSocialMediaCreateModel = {
          url: $formData.url,
          type: $formData.type,
          ordering: $formData.ordering,
          published: $formData.published,
      };

        if (!socialMedia) {
            return await createSocialMediaHandler(payload);
        }

        return await updateServiceHandler(payload);
    };

    const createSocialMediaHandler = async (payload: AdminSocialMediaCreateModel) => {
        try {
            const res = await createSocialMedia(fetch, $tokenStore, payload);
        } catch (error) {
            toast.error(String(error));
            return;
        }
        toast.success("Успешно создано");
        goto("/admin/social-media")
    };

    const updateServiceHandler = async (payload: AdminSocialMediaCreateModel) => {
        if (!socialMedia?.id) {
            toast.error("Что-то пошло не так");
        }
        try {
            const res = await updateSocialMedia(
                fetch,
                $tokenStore,
                socialMedia?.id,
                payload,
            );
        } catch (error) {
            toast.error(String(error));
            return;
        }
        toast.success("Успешно создано");
    };

    const deleteSocialMediaHandler = async () => {
        if (!socialMedia?.id) {
          toast.error("Что-то пошло не так");
        }
        try {
            const res = await deleteSocialMedia(
                fetch,
                $tokenStore,
                socialMedia?.id,
            );
        } catch (error) {
          toast.error(String(error));
            return;
        }
        toast.success("Успешно удалено");
        goto("/admin/social-media")
    }
</script>

    <div class="flex justify-between items-center my-5">
        {#if socialMedia}<h2>Сиц. сеть - {socialMedia.id}</h2>
            <!-- <Button
                onClick={deleteSocialMediaHandler}
                label="Удалить"
                variant="secondary"
            /> -->
            <Button onclick={deleteSocialMediaHandler} variant="destructive">Удалить</Button>
        {:else}
            <h2>Создание соц. сети</h2>
        {/if}
    </div>
    <form onsubmit={handelSubmit}>
        <Form.Field form={sform} name="url">
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label>Ссылка</Form.Label>
                <Input {...attrs} bind:value={$formData.url} />
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field form={sform} name="type">
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label>Тип</Form.Label>
                <Select.Root type="single" {...attrs} bind:value={$formData.type} name="type">
                  <Select.Trigger class="w-full bg-(--background)">
                      {$formData.type
                      ? $formData.type
                                    : "Выберите соц.сеть"}
                  </Select.Trigger>
                  <Select.Content>
                      {#each Object.entries(MediaType) as [k,v]}
                          <Select.Item value={v}>{k}</Select.Item>
                      {/each}
                  </Select.Content>
                </Select.Root>
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field form={sform} name="ordering">
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label>Сортировка</Form.Label>
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
        <Button type="submit">{socialMedia ? 'Сохранить': 'Создать'}</Button>
    </form>
