<script>
  import Button from "@shared/ui/Button.svelte";
  import { contacts } from "@entities/contact/model/contact";
  import ContactCard from "@entities/contact/ui/contact-card.svelte";
</script>

<section id="hero" class="h-screen w-full">
  <div
    class="absolute h-screen w-full bg-white opacity-3 z-2"
    style="clip-path:polygon(0% 0%, 100% 0%, 100% 75%, 0% 50%)"
  ></div>
  <div class="absolute h-screen w-full bg-amber-950 opacity-10 z-1"></div>
  <div class="absolute h-full w-full flex items-end md:hidden">
    <img
      alt="background"
      src="/background.webp"
      class=" object-cover opacity-15 mx-auto"
    />
  </div>
  <div class="absolute h-full w-full hidden  md:flex  justify-end items-center">
    <img
      alt="background"
      src="/hero-background.webp"
      class="my-auto w-100 h-auto opacity-50"
    />
  </div>

  <div
    class="relative h-full w-full flex justify-between items-center flex-col text-center p-4 z-10"
  >
    <div></div>
    <div>
      <h1 class="!text-4xl my-2 font-[HiraMinProNW6]">Гётин</h1>
      <h2>Барбершоп В Красноярске</h2>
      <h3 class="text-gray-500 my-5 !text-sm">
        Мужские стрижки и бритье на ул. Лесников, 27
      </h3>
      <Button label="Записаться" onClick={() => console.log("Cliked")} />
    </div>
    <div class="flex gap-4">
      {#each contacts as contact}
        <ContactCard {contact} />
      {/each}
    </div>
  </div>
</section>
