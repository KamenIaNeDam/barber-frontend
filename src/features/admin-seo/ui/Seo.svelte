<script lang="ts">
    import { setSeo } from "@entities/seo/api/seo";
    import { adminSeoSchema, type AdminSeoSchema } from "@entities/seo/model/schema";
    import type { Seo } from "@entities/seo/model/types";
    import { tokenStore } from "@shared/stores/auth";
    import { toast } from "svelte-sonner";
    import { superForm, type SuperValidated } from "sveltekit-superforms";
    import { zod4Client } from "sveltekit-superforms/adapters";
    import * as Form from "@shared/ui/form/index"
    import Input from "@shared/ui/input/input.svelte";
    import Textarea from "@shared/ui/textarea/textarea.svelte";

    interface AdminSeoProps {
      seo?: Seo,
      form: SuperValidated<AdminSeoSchema>
    }

    let {
      seo = undefined,
      form,
    }: AdminSeoProps = $props()

    const sform = superForm(form, {
        validators: zod4Client(adminSeoSchema),
    });

    const { form: formData, errors, validateForm } = sform;


    const handelSubmit = async (event: Event) => {
      event.preventDefault()
      const validationResult = await validateForm()

      if (!validationResult.valid ) {
        errors.set(validationResult.errors)
        toast.error("Ошибка в заполнении формы", )
        return
      }
      const payload: Seo = {
        title: $formData.title,
        description: $formData.description,
        keywords: $formData.keywords,
      }
        seo = await setSeo(fetch, $tokenStore, payload)
        toast.success("Успешно обновлено")
    }

</script>

    <form onfocusout={handelSubmit} class="space-y-4">
        <Form.Field form={sform} name="title">
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label>SEO заголовок</Form.Label>
                <Textarea {...attrs} bind:value={$formData.title} />
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field form={sform} name="description">
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label>SEO Описание</Form.Label>
                <Textarea {...attrs} bind:value={$formData.description} />
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field form={sform} name="keywords">
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label>SEO Ключевые слова</Form.Label>
                <Textarea {...attrs} bind:value={$formData.keywords} />
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
    </form>
