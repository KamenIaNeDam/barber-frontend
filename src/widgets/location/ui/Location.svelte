<script lang="ts">
    import { PUBLIC_YANDEX_MAPS_API_KEY } from "$env/static/public";
    import type { ContactModel } from "@entities/contact/model/contact";
    import ContactCard from "@entities/contact/ui/contact-card.svelte";
    import type { LocationModel } from "@entities/location/model/location";
    import type { SocialMediaModel } from "@entities/social-media/model/socia-media";

    // 55.981218, 92.801386
    // export let long: number = 92.801386;
    // export let lat: number = 55.981218;

    import { onMount } from "svelte";

    export let location: LocationModel = {
        long: 92.801386,
        lat: 55.981218,
    };

    export let contacts: ContactModel[] = [];
    export let socialMedias: SocialMediaModel[] = [];

    onMount(async () => {
        // Ждём, пока API загрузится
        function waitForYMaps3() {
            return new Promise((resolve) => {
                const check = () => {
                    if (window.ymaps3 && window.ymaps3.ready) {
                        window.ymaps3.ready.then(resolve);
                    } else {
                        requestAnimationFrame(check);
                    }
                };
                check();
            });
        }
        await waitForYMaps3();

        const {
            YMap,
            YMapDefaultSchemeLayer,
            YMapDefaultFeaturesLayer,
            YMapControls,
        } = ymaps3;

        const map = new YMap(document.getElementById("map"), {
            location: {
                center: [location.long, location.lat],
                zoom: 17,
            },
        });

        map.addChild(new YMapDefaultSchemeLayer());
        map.addChild(new YMapDefaultFeaturesLayer());

        const YMapDefaultUI = await import("@yandex/ymaps3-default-ui-theme");

        map.addChild(
            new YMapDefaultUI.YMapDefaultMarker({
                coordinates: [location.long, location.lat],
            }),
        );

        const controls = new YMapControls({ position: "right" });
        controls.addChild(
            new YMapDefaultUI.YMapZoomControl({
                easing: "linear",
            }),
        );
        controls.addChild(new YMapDefaultUI.YMapGeolocationControl());

        map.addChild(controls);
    });
</script>

<svelte:head>
    <script
        src={`https://api-maps.yandex.ru/v3/?apikey=${PUBLIC_YANDEX_MAPS_API_KEY}&lang=ru_RU`}
        type="text/javascript"
    ></script>
</svelte:head>

<section id="contacts" class="w-full text-black bg-white  pt-20">
    <!-- <img
        alt="compas"
        src="/compas.png"
        class="absolute w-[40%] right-0 object-cover opacity-25"
    /> -->
    <div class="relative z-10 space-y-5 ">
        <h2 class="text-center">Наши контакты</h2>
        <p class="text-center max-w-xl mx-auto text-gray-500 !text-sm px-5">
            Хотите записаться на стрижку или бритье? Свяжитесь с нами любым удобным способом — по телефону, мессенджеру или приезжайте в наш барбершоп. Мы всегда рады новым и постоянным клиентам!
        </p>
        <div class="max-w-lg flex flex-col gap-4 px-5">
            {#each contacts as contact}
                <div>
                    <h3 class="text-xl">{contact.title}:</h3>
                    <div class="">
                    {#if contact.href}
                        <a href={contact.href}>{contact.value}</a>
                    {:else}
                        <span>{contact.value}</span>
                    {/if}
                    </div>
                </div>
            {/each}
        </div>
        {#if socialMedias.length > 0}
        <div class="max-w-lg px-5 flex gap-4 ">
            {#each socialMedias as media}
                <div class="bg-black rounded-full p-1">

              <ContactCard contact={media} />
                </div>
            {/each}
        </div>
        {/if}

    <div id="map" class="w-full h-[400px]"></div>
    </div>
</section>
