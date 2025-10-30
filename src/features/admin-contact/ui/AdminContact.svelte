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
    } from "@entities/contact/model/types";
    import { tokenStore } from "@shared/stores/auth";
    import * as Form from "@shared/ui/form/index"
    import Button from "@shared/ui/button/button.svelte";
    import { addToast } from "@shared/ui/toast/store";
    import { superForm, type SuperValidated } from "sveltekit-superforms";
    import { adminContactSchema, type AdminContactSchema } from "@entities/contact/model/schema";
    import { zod4Client, zodClient } from "sveltekit-superforms/adapters";
    import Input from "@shared/ui/input/input.svelte";
    import Switch from "@shared/ui/switch/switch.svelte";
    import { toast } from "svelte-sonner";

    interface AdminContactProps  {
      contact?: AdminContactModel,
      form: SuperValidated<AdminContactSchema>,
    }

    let {
      contact = undefined,
      form,
    }: AdminContactProps = $props()

    const sform = superForm(form, {
        validators: zod4Client(adminContactSchema),
    });

    const { form: formData, errors, validateForm } = sform;

    const onSubmit = async (event: Event) => {
      event.preventDefault()
      const validationResult = await validateForm()

      if (!validationResult.valid ) {
        errors.set(validationResult.errors)
        toast.error("Ошибка в заполнении формы")
        return
      }
      const payload: AdminContactCreateModel = {
          title: $formData.title,
          value: $formData.value,
          href: $formData.href || undefined,
          ordering: $formData.ordering,
          published: $formData.published,
      };

      if (!contact) {
          await createContactHandler(payload);
      } else {
          await updateContactHandler(payload);
      }
    }

    const createContactHandler = async (payload: AdminContactCreateModel) => {
        try {
            await createContact(fetch, $tokenStore, payload);
            toast.success("Успешно создано");
            goto("/admin/contact");
        } catch (error) {
            toast.error(String(error));
        }
    };

    const updateContactHandler = async (payload: AdminContactCreateModel) => {
        if (!contact?.id) {
            toast.error("Что-то пошло не так");
            return;
        }
        try {
            await updateContact(fetch, $tokenStore, contact.id, payload);
            toast.success("Успешно обновлено");
        } catch (error) {
          toast.error(String(error));
        }
    };

    const deleteContactHandler = async () => {
        if (!contact?.id) {
          toast.error("Что-то пошло не так");
            return;
        }
        try {
            await deleteContact(fetch, $tokenStore, contact.id);
            toast.error("Успешно удалено");
            goto("/admin/contact");
        } catch (error) {
          toast.error(String(error));
        }
    }
</script>

<div class="max-w-md">
    <div class="flex justify-between items-center my-5">
        {#if contact}
            <h2>Контакт - {contact.id}</h2>
            <Button onclick={deleteContactHandler} variant="destructive">Удалить</Button>
        {:else}
            <h2>Создание контакта</h2>
        {/if}
    </div>

    <form onsubmit="{onSubmit}">
        <Form.Field form={sform} name="title">
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label>Заголовок</Form.Label>
                <Input {...attrs} bind:value={$formData.title} />
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field form={sform} name="value">
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label>Значение</Form.Label>
                <Input {...attrs} bind:value={$formData.value} />
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field form={sform} name="href">
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label>Ссылка</Form.Label>
                <Input {...attrs} bind:value={$formData.href} />
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

        <Button
            type="submit"

        >{contact ? 'Сохранить' : 'Создать'}</Button>
    </form>
</div>
