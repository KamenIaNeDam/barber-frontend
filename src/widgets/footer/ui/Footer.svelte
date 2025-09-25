<script lang="ts">
  import { menuItems } from "@entities/menu/model/menuItems";
  import { contacts } from "@entities/contact/model/contact";
  import ContactCard from "@entities/contact/ui/contact-card.svelte";
</script>

<footer class="py-10 px-5">
  <div class="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-y-4">
    <!-- Логотип и описание -->
    <div>
      <h2 class="text-xl font-bold mb-2">Barber</h2>
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
      <p class="text-gray-400 text-sm">Телефон: +7 123 456-78-90</p>
      <p class="text-gray-400 text-sm">Адрес: Улица Лесников, 37Б, Красноярск, 660006</p>
      <p class="text-gray-400 text-sm">Режим работы: Пн-Пт: 10:00-22:00, Сб: 10:00-21:00, Вс: выходной</p>
        <div class="flex gap-4">
      {#each contacts as contact}
        <ContactCard {contact} />
      {/each}
    </div>

    </div>
  </div>

  <div class="mt-8 text-center text-gray-500 text-sm">
    © {new Date().getFullYear()} Barber. Все права защищены.
  </div>
</footer>