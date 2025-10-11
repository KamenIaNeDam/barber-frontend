<script lang="ts">
    import type { ServiceModel } from "@entities/service/model/service";
    import Button from "@shared/ui/Button.svelte";
    export let services: ServiceModel[] = []
</script>

<section
    id="service"
    class="hidden sm:block w-full text-black bg-white py-20 px-5"
>
    <h2 class="text-center">Услуги</h2>
    <p class="text-center max-w-xl mx-auto my-5 text-gray-500 !text-sm">
        Ознакомьтесь с нашими услугами: стрижки, оформление бороды, укладки и другие процедуры для мужчин. Мы предлагаем честные цены и индивидуальный подход к каждому клиенту.
    </p>
    <ul class="pt-10 grid grid-cols-2 gap-x-10 gap-y-4">
        {#each services as service}
            <li
                class="w-full flex justify-between border-b py-2 border-neutral-500"
            >
                <span>{service.title}</span>
                <span
                    >{#if service.price == 0}Бесплатно{:else}{service.price}
                        ₽{/if}</span
                >
            </li>
        {/each}
    </ul>
    <div class="w-full grid place-items-center pt-10">
            <Button
                _class="ms_booking"
                label="Записаться"
                onClick={() => console.log("Clicked")}
                variant="secondary"
            />
    </div>
</section>

<section
    id="service"
    class="block sm:hidden w-full text-black bg-white py-20 px-5"
>
    <h2 class="text-center">Услуги</h2>
    <p class="text-center max-w-xl mx-auto my-5 text-gray-500 !text-sm">
        Ознакомьтесь с нашими услугами: стрижки, оформление бороды, укладки и другие процедуры для мужчин. Мы предлагаем честные цены и индивидуальный подход к каждому клиенту.
    </p>
    <ul class="pt-10 grid grid-cols-1 gap-x-10 gap-y-4">
        {#each services as service}
            <li
                class="w-full flex justify-between border-b py-2 border-neutral-500"
            >
                <span>{service.title}</span>
                <span
                    >{#if service.price == 0}Бесплатно{:else}{service.price}
                        ₽{/if}</span
                >
            </li>
        {/each}
    </ul>
    <div class="w-full grid place-items-center pt-10">
            <Button
                _class="ms_booking"
                label="Записаться"
                onClick={() => console.log("Clicked")}
                variant="secondary"
            />
    </div>
</section>
