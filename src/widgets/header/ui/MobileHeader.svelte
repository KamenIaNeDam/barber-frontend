<script lang="ts">
  import { menuItems } from "@entities/menu/model/menuItems";
  import BurgerMenuIcon from "@shared/ui/icons/BurgerMenuIcon.svelte";
  import CloseIcon from "@shared/ui/icons/CloseIcon.svelte";
  import { contacts } from "@entities/contact/model/contact";
  import ContactCard from "@entities/contact/ui/contact-card.svelte";
  import { NAME } from "@shared/constants/title";

  let isOpen = false;
</script>

<header
  class="flex justify-between items-center absolute w-full top-0 bg-black/50 z-1000 p-4"
>
  <div class="text-2xl font-[HiraMinProNW6]">{NAME}</div>

  <button class="cursor-pointer" on:click={() => (isOpen = !isOpen)}>
    {#if isOpen}
      <CloseIcon />
    {:else}
      <BurgerMenuIcon />
    {/if}
  </button>
</header>

{#if isOpen}
  <nav
    class=" z-900 text-2xl absolute h-screen w-full flex justify-between items-center flex-col bg-black overflow-y-auto px-8 py-4"
  >
    <div class=""></div>
    <div class="flex justify-center items-center flex-col gap-4">
      {#each menuItems as item}
        <a href={item.href} class="hover:text-blue-600 transition mx-auto">
          {item.title}
        </a>
      {/each}
    </div>
    <div class="flex gap-4">
      {#each contacts as contact}
        <ContactCard {contact} />
      {/each}
    </div>
  </nav>
{/if}
