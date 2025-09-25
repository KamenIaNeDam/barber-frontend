<script lang="ts">
  import { menuItems } from "@entities/menu/model/menuItems";
</script>

<header class="hidden md:flex justify-between items-center px-8 py-4 bg-white shadow">
  <div class="text-2xl font-bold">MyApp</div>

  <nav class="flex gap-6">
    {#each menuItems as item}
      <a href={item.href} class="hover:text-blue-600 transition">
        {item.title}
      </a>
    {/each}
  </nav>
</header>