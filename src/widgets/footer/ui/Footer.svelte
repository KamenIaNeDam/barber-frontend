<script lang="ts">
  import { menuItems } from "@entities/menu/model/menuItems";
  // import { contacts } from "@entities/contact/model/types";
  import ContactCard from "@entities/contact/ui/contact-card.svelte";
  import { NAME } from "@shared/constants/title";
    import type { SocialMediaModel } from "@entities/social-media/model/types";
    import type { ContactModel } from "@entities/contact/model/types";


  export let socialMedias: SocialMediaModel[] = []
    export let contacts: ContactModel[] = [];
</script>

<footer class="py-10 px-5">
  <div class="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-y-4">
    <!-- Логотип и описание -->
    <div>
      <h2 class="text-xl font-bold mb-2">{NAME}</h2>
      <!-- <p class="text-gray-400 text-sm">
        Современное приложение для решения ваших задач. Мы делаем всё просто и удобно.
      </p> -->
    </div>

    <!-- Ссылки -->
    <div>
      <h3 class="font-semibold mb-2">Навигация</h3>
      <ul class="space-y-1">
        {#each menuItems as link}
          <li>
            <a href={link.href} class="transition">{link.title}</a>
          </li>
        {/each}
      </ul>
    </div>

    <!-- Контакты -->
    <div>
      <h3 class="font-semibold mb-2">Контакты</h3>
      {#each contacts as contact}
        <p class="text-gray-400 text-sm">{contact.title}: {contact.value}</p>
      {/each}
      <!-- <p class="text-gray-400 text-sm">Телефон: +7 123 456-78-90</p>
      <p class="text-gray-400 text-sm">Адрес: Улица Лесников, 27, Красноярск, 660006</p>
      <p class="text-gray-400 text-sm">Режим работы: Ежедневно: 10:00-21:00</p> -->
        <div class="flex gap-4">
      {#each socialMedias as media}
        <ContactCard contact={media} />
      {/each}
    </div>

    </div>
  </div>

  <div class="mt-8 text-center text-gray-500 text-sm">
    © {new Date().getFullYear()} {NAME}. Все права защищены.
  </div>
</footer>
