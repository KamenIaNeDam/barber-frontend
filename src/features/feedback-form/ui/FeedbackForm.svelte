<script lang="ts">
    import Button from "@shared/ui/Button.svelte";
    import type { FeedbackFormData } from "../model/types";
    import { createEventDispatcher, onMount } from "svelte";
    import { PUBLIC_SMART_CAPTCHA_SITE_KEY } from "$env/static/public";
    import { sendFeedBack } from "../api/feetback";


    const dispatch = createEventDispatcher<{ submit: FeedbackFormData }>();

    let form: FeedbackFormData = {
        fio: "",
        contact: "",
        text: "",
        captcha: "",
    };

   let formErrors: {
     fio: string|null,
     contact: string|null,
     text: string|null,
     captcha: string|null,
   } = {
     fio: null,
     contact: null,
     text: null,
     captcha: null,
   }

   let hasError = false
   let showSuccess = false
   let captchaContainer: HTMLDivElement;


    async function handleSubmit() {
        dispatch("submit", form);
        hasError = false
        formErrors = {
          fio: null,
          contact: null,
          text: null,
          captcha: null,
        }
        formErrors.fio = form.fio ? null : "Введите ФИО";
        formErrors.contact = form.contact ? null : "Введите контакт";
        // formErrors.text = form.text.length >= 10 ? null : "Текст должен содержать больше 10 символов";
        formErrors.captcha = form.captcha ? null : "Введите SmartCaptcha";
        hasError = Object.values(formErrors).some(Boolean);

        if (hasError){
          return
        }

        try{
          await sendFeedBack(fetch, form)
        } catch {
          formErrors.captcha = "Не смогли отправить запрос. Попробуйте позже"
          return
        }

        showSuccess = true
        setTimeout(() => {
          showSuccess = false
          loadCaptcha()
        }, 5000);

        form = {
            fio: "",
            contact: "",
            text: "",
            captcha: "",
        }
        formErrors = {
          fio: null,
          contact: null,
          text: null,
          captcha: null,
        }
    }

    onMount(() => {
      loadCaptcha()
    })
    const loadCaptcha = () => {
    const tryLoad = () => {
       if (window.smartCaptcha && captchaContainer) {
         window.smartCaptcha.render(captchaContainer, {
           sitekey: PUBLIC_SMART_CAPTCHA_SITE_KEY,
           hl: 'ru',
           callback: (token: string) => form.captcha = token,
           "expired-callback": () => form.captcha = "",
         });
       } else {
         setTimeout(tryLoad, 500); // повторяем попытку через полсекунды
       }
     }
     tryLoad();
    }

</script>

{#if showSuccess}
    <div class="max-w-md mx-auto mt-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg text-center">
            ✅ Ваша форма успешно отправлена!
        </div>
{:else}
<form
    class="w-full max-w-md mx-auto space-y-4"
    on:submit|preventDefault={handleSubmit}
>

        <label class="block"
            >ФИО
            <input
                type="text"
                bind:value={form.fio}
                required
                class="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-700 outline-none"
            />
            {#if formErrors.fio}<span class="text-red-500 text-sm">{formErrors.fio}</span>{/if}
        </label>

        <label class="block"
            >Контакт (почта или телефон)
            <input
                type="text"
                bind:value={form.contact}
                required
                class="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-700 outline-none"
            />
            {#if formErrors.contact}<span class="text-red-500 text-sm">{formErrors.contact}</span>{/if}
        </label>
        <label class="block"
            >Текст
            <textarea
                bind:value={form.text}
                rows="4"
                required
                class="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-700 outline-none"
            ></textarea>
            {#if formErrors.text}<span class="text-red-500 text-sm">{formErrors.text}</span>{/if}
        </label>
    <div>

    <div
        bind:this={captchaContainer}
    ></div>
    {#if formErrors.captcha}<span class="text-red-500 text-sm">{formErrors.captcha}</span>{/if}
    <input type="hidden" name="smart-token" required bind:value={form.captcha} />
    </div>

    <div class="w-full grid place-items-center">
        <Button
            label="Отправить"
            type="submit"
            onClick={() => {}}
            variant="secondary"
        />
    </div>
</form>
{/if}
