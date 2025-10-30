<script lang="ts">
    import { goto } from "$app/navigation";
    import type { AdminServiceModel, AdminServiceCreateModel } from "@entities/service/model/types";
    import { createService, updateService, getServiceByID, deleteService } from "@entities/service/api/admin-service";
    import { tokenStore } from "@shared/stores/auth";
    import { superForm, type SuperValidated } from "sveltekit-superforms";
    import { adminServiceSchema, type AdminServiceSchema } from "@entities/service/model/schema";
    import { toast } from "svelte-sonner";
    import Button from "@shared/ui/button/button.svelte";
    import { zod4Client } from "sveltekit-superforms/adapters";
    import * as Form from "@shared/ui/form/index"
    import Input from "@shared/ui/input/input.svelte";
    import Switch from "@shared/ui/switch/switch.svelte";

    interface AdminServiceProps {
      service?: AdminServiceModel,
      form: SuperValidated<AdminServiceSchema>
    }

    let {
      service = undefined,
      form,
    }: AdminServiceProps = $props()

    const sform = superForm(form, {
        validators: zod4Client(adminServiceSchema),
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
      const payload: AdminServiceCreateModel = {
          title: $formData.title,
          price: $formData.price,
          ordering: $formData.ordering,
          published: $formData.published,
      };

        if (!service) {
            return await createServiceHandler(payload);
        }

        return await updateServiceHandler(payload);
    };

    const createServiceHandler = async (payload: AdminServiceCreateModel) => {
        try {
            const res = await createService(fetch, $tokenStore, payload);
        } catch (error) {
            toast.error(String(error));
            return;
        }
        toast.success("Успешно создано");
        goto("/admin/service")
    };

    const updateServiceHandler = async (payload: AdminServiceCreateModel) => {
        if (!service?.id) {
            toast.error("Что-то пошло не так");
        }
        try {
            const res = await updateService(
                fetch,
                $tokenStore,
                // @ts-ignore
                service?.id,
                payload,
            );
        } catch (error) {
            toast.error(String(error));
            return;
        }
        toast.success("Успешно создано");
    };

    const deleteServiceHandler = async () => {
        if (!service?.id) {
          toast.error("Что-то пошло не так");
        }
        try {
            const res = await deleteService(
                fetch,
                $tokenStore,
                // @ts-ignore
                service?.id,
            );
        } catch (error) {
          toast.error(String(error));
            return;
        }
        toast.success("Успешно удалено");
        goto("/admin/service")
    }
</script>
    <div class="flex justify-between items-center my-5">
        {#if service}<h2>Услуга - {service.id}</h2>
            <Button onclick={deleteServiceHandler} variant = "destructive">Удалить</Button>
        {:else}
            <h2>Создание услуги</h2>
        {/if}
    </div>
    <form onsubmit={handelSubmit}>
        <Form.Field form={sform} name="title">
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label>Заголовок</Form.Label>
                <Input {...attrs} bind:value={$formData.title} />
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field form={sform} name="price">
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label>Цена</Form.Label>
                <Input {...attrs} type="number" bind:value={$formData.price} />
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
        <Button type="submit">{service ? 'Сохранить': 'Создать'}</Button>
    </form>
