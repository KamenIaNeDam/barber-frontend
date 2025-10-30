<script lang="ts">
    import type { FeedbackFormData } from "../model/types";
    import {  onMount } from "svelte";
    import { PUBLIC_SMART_CAPTCHA_SITE_KEY } from "$env/static/public";
    import { sendFeedBack } from "../api/feetback";
    import { superForm, type SuperValidated } from "sveltekit-superforms";
    import { feedbackSchema, type FeedbackSchema } from "../model/schema";
    import { zod4Client } from "sveltekit-superforms/adapters";
    import * as Form from "@shared/ui/form/index"
    import Input from "@shared/ui/input/input.svelte";
    import Textarea from "@shared/ui/textarea/textarea.svelte";
    import { toast } from "svelte-sonner";
    import Button from "@shared/ui/Button.svelte";

    interface FeedbackFormProps {
      form: SuperValidated<FeedbackSchema>
    }

    let {
      form,
    }: FeedbackFormProps = $props()

    const sform = superForm(form, {
        validators: zod4Client(feedbackSchema),
    });

    const { form: formData, errors, validateForm, reset } = sform;

    let widgetId = $state()

   let captchaContainer: HTMLDivElement;


   const handleSubmit = async (event: Event) => {
        event.preventDefault()

        const validationResult = await validateForm()
        if (!validationResult.valid ) {
          errors.set(validationResult.errors)
          toast.error("Ошибка в заполнении формы")
          return
        }

        const payload: FeedbackFormData = {
          fio: $formData.fio,
          contact: $formData.contact,
          text: $formData.text,
          captcha: $formData.captcha,
        }
        try{
          await sendFeedBack(fetch, payload)
        } catch {
          toast.error("Не смогли отправить запрос. Попробуйте позже" )
          return
        }

        toast.success("Спасибо за обратную связь!")
        reset()
        // loadCaptcha()
        if (window.smartCaptcha) window.smartCaptcha.reset(widgetId)
    }

    onMount(() => {
      loadCaptcha()
    })
    const loadCaptcha = () => {
    const tryLoad = () => {
       if (window.smartCaptcha && captchaContainer) {
         widgetId = window.smartCaptcha.render(captchaContainer, {
           sitekey: PUBLIC_SMART_CAPTCHA_SITE_KEY,
           hl: 'ru',
           callback: (token: string) => $formData.captcha = token,
           "expired-callback": () => $formData.captcha = "",
         });
       } else {
         setTimeout(tryLoad, 500); // повторяем попытку через полсекунды
       }
     }
     tryLoad();
    }

</script>

<form
    class="w-full max-w-md mx-auto space-y-4"
    onsubmit={handleSubmit}
>

        <Form.Field form={sform} name="fio">
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label class="font-bold">ФИО</Form.Label>
                <Input {...attrs} bind:value={$formData.fio} placeholder="..."/>
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field form={sform} name="contact">
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label class="font-bold">Контакт (почта или телефон)</Form.Label>
                <Input {...attrs} bind:value={$formData.contact} placeholder="..."/>
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field form={sform} name="text">
            <Form.Control>
                {#snippet children(attrs)}
                <Form.Label class="font-bold">Текст</Form.Label>
                <Textarea {...attrs} bind:value={$formData.text} placeholder="..." />
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>


    <Form.Field form={sform} name="captcha">
        <Form.Control>
            {#snippet children(attrs)}
                <div
                    bind:this={captchaContainer}
                ></div>
            <Input type="hidden" name="smart-token" {...attrs} bind:value={$formData.captcha} />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>


    <div class="w-full grid place-items-center">
        <Button type="submit" label="Отправить" />
    </div>
</form>
