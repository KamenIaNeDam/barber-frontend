<script lang="ts">
    import { goto } from "$app/navigation";
    import { tokenStore } from "@shared/stores/auth";
    import type { AdminFeedbackModel, AdminFeedbackUpdateModel } from "@entities/feedback/model/types";
    import { updateFeedback, deleteFeedback } from "@entities/feedback/api";
    import {adminFeedbackUpdateSchema, type AdminFeedbackUpdateSchema} from "@entities/feedback/model/schema"
    import { toast } from "svelte-sonner";
    import { superForm, type SuperValidated } from "sveltekit-superforms";
    import { zod4Client } from "sveltekit-superforms/adapters";
    import Button from "@shared/ui/button/button.svelte";
    import * as Form from "@shared/ui/form/index"
    import Input from "@shared/ui/input/input.svelte";
    import Switch from "@shared/ui/switch/switch.svelte";
    import Textarea from "@shared/ui/textarea/textarea.svelte";

    interface AdminFeedbackProps  {
      feedback: AdminFeedbackModel,
      form: SuperValidated<AdminFeedbackUpdateSchema>,
    }
    let {
      feedback,
      form,
    }: AdminFeedbackProps = $props()

    const sform = superForm(form, {
        validators: zod4Client(adminFeedbackUpdateSchema),
    });

    const { form: formData, errors, validateForm } = sform;


    const handleSubmit = async (event: Event) => {
      event.preventDefault()

      const validationResult = await validateForm()

      if (!validationResult.valid ) {
        errors.set(validationResult.errors)
        toast.error("Ошибка в заполнении формы", )
        return
      }

      const payload: AdminFeedbackUpdateModel = {
        processed: $formData.processed,
        admin_text: $formData.admin_text,
      }


      try {
          const res = await updateFeedback(
              fetch,
              $tokenStore,
              feedback.id,
              payload,
          );
      } catch (error) {
          toast.error(String(error));
          return;
      }
      toast.success("Успешно обновлено");
    };

    const deleteFeedbackHandler = async () => {
      if (!confirm("Удалить эту запись?")) return;
        try {
            const res = await deleteFeedback(
                fetch,
                $tokenStore,
                feedback?.id,
            );
        } catch (error) {
          toast.error(String(error));
            return;
        }
        toast.success("Успешно удалено");
        goto("/admin/feedback")
    }
</script>

    <div class="flex justify-between items-center my-5">
<h2>Обратная связь - {feedback.id}</h2>
            <Button onclick={deleteFeedbackHandler}> Удалить</Button>
    </div>
    <form onsubmit={handleSubmit}>
        <Form.Field form={sform} name="fio" aria-disabled>
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label>ФИО</Form.Label>
                <Input disabled {...attrs} bind:value={$formData.fio} />
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field form={sform} name="contact" aria-disabled>
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label>Контакт</Form.Label>
                <Input disabled {...attrs} bind:value={$formData.contact} />
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field form={sform} name="text" aria-disabled>
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label>Текст</Form.Label>
                <Textarea disabled {...attrs} bind:value={$formData.text} />
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field form={sform} name="processed" aria-disabled>
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label>Обработан</Form.Label>
                <Switch {...attrs} bind:checked={$formData.processed} />
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field form={sform} name="admin_text" aria-disabled>
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label>Текст Администратора</Form.Label>
                <Textarea {...attrs} bind:value={$formData.admin_text} />
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        {#if feedback}
            <Form.Field form={sform} name="created_at" aria-disabled>
                <Form.Control>
                    {#snippet children(attrs)}
                    <Form.Label>Текст</Form.Label>
                    <Input disabled {...attrs} bind:value={$formData.created_at} />
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            {/if}

        <Button type="submit">Сохранить</Button>
    </form>
