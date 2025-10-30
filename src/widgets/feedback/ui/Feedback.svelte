<!-- src/routes/+page.svelte -->
<script lang="ts">
    import type { FeedbackSchema } from "@features/feedback-form/model/schema";
  import FeedbackForm  from "@features/feedback-form/ui/FeedbackForm.svelte";
    import type { SuperValidated } from "sveltekit-superforms";

  const feedbackJson = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Форма обратной связи — Барбершоп «Гётин»",
      "url": "https://getinbarber.ru",
      "description": "Свяжитесь с барбершопом «Гётин» в Красноярске через форму обратной связи. Онлайн-запись, вопросы и предложения.",
      "mainEntity": {
        "@type": "Organization",
        "name": "Барбершоп «Гётин»",
        "url": "https://getinbarber.ru",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          // "telephone": "+7 (999) 123-45-67",
          // "email": "info@gotin.ru",
          "availableLanguage": ["Russian"]
        }
      }
    };

  interface FeedbackProps {
    form: SuperValidated<FeedbackSchema>
  }

  let {
    form,
  }: FeedbackProps = $props()
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(feedbackJson)}</script>`}
</svelte:head>

<section id="feedback" class=" w-full text-black bg-white py-20 px-5">

  <h2 class="text-center">Форма обратной связи</h2>
  <p class="text-center max-w-xl mx-auto my-5 text-gray-500 !text-sm">
    Если у вас есть вопросы или предложения, оставьте сообщение в форме ниже, и мы свяжемся с вами в ближайшее время.
  </p>
  <div class="">

    <FeedbackForm form={form}/>
  </div>
</section>
