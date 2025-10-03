<script>
  import { contacts } from "@entities/contact/model/contact";
  import ContactCard from "@entities/contact/ui/contact-card.svelte";

</script>

<div class="text-black bg-white flex flex-col justify-center items-center gap-8 m-5">
  <h2 class="text-3xl">Скоро открытие!</h2>
  <p class="text-xl">Подпишитесь на наши соцсети, чтобы не пропустить свежие новости.</p>
  <div class="flex gap-4">
    {#each contacts as contact}
      <div class="bg-black rounded-full p-1">
        <ContactCard {contact} />
      </div>
    {/each}
  </div>
</div>
