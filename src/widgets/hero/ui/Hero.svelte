<script>
    import Button from "@shared/ui/Button.svelte";
      import { contacts } from "@entities/contact/model/contact";
  import ContactCard from "@entities/contact/ui/contact-card.svelte";
</script>

<section
    id="hero"
    class="h-screen w-full flex justify-between items-center flex-col text-center bg-no-repeat bg-right [background-size:500px] p-4"
    style="background-image: url('https://optim.tildacdn.net/tild6139-3739-4038-a466-373862333664/-/format/webp/face2x.png.webp');"
>
    <div></div>
    <div>
        <h1 class="!text-4xl">Гётин</h1>
        <h2>Барбершоп В Красноярске</h2>
        <h3 class="text-gray-500 my-5 !text-sm">
            Мужские стрижки и уход за бородой на ул. Лесников, 37Б
        </h3>
        <Button label="Записаться" onClick={() => console.log("Cliked")} />
    </div>
    <div class="flex gap-4">
      {#each contacts as contact}
        <ContactCard {contact} />
      {/each}
    </div>
</section>
