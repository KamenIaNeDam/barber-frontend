<!-- src/routes/+page.svelte -->
<script lang="ts">
  import FeedbackForm  from "@features/feedback-form/ui/FeedbackForm.svelte";
</script>

<section id="feedback" class=" w-full text-black bg-white py-20 px-5">

  <h2 class="text-center">Форма обратной связи</h2>
  <p class="text-center max-w-xl mx-auto my-5 text-gray-500 !text-sm">
    Если у вас есть вопросы или предложения, оставьте сообщение в форме ниже, и мы свяжемся с вами в ближайшее время.
  </p>
  <div class="">

    <FeedbackForm />
  </div>
</section>
