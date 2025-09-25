<!-- src/routes/+page.svelte -->
<script lang="ts">
  import FeedbackForm  from "@features/feedback-form/ui/FeedbackForm.svelte";

  function handleFeedbackSubmit(event: any) {
    const data = event.detail;
    console.log("Feedback received:", data);
    // TODO: send to API
  }
</script>

<section id="feedback" class=" w-full text-black bg-white py-20">

  <h2 class="text-center">Обратная связь</h2>

  <div class="pt-10 px-5">

    <FeedbackForm on:submit={handleFeedbackSubmit} />
  </div>
</section>