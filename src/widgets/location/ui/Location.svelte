<script lang="ts">
    import { PUBLIC_YANDEX_MAPS_API_KEY } from "$env/static/public";

    // 55.981218, 92.801386
    export let long: number = 92.801386;
    export let lat: number = 55.981218;

    import { onMount } from "svelte";

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
                center: [long, lat],
                zoom: 17,
            },
        });

        map.addChild(new YMapDefaultSchemeLayer());
        map.addChild(new YMapDefaultFeaturesLayer());

        const YMapDefaultUI = await import("@yandex/ymaps3-default-ui-theme");

        map.addChild(
            new YMapDefaultUI.YMapDefaultMarker({
                coordinates: [long, lat],
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

<section id="contacts" class="w-full text-black bg-white">
    <img
        alt="compas"
        src="/compas.png"
        class="absolute w-[40%] right-0 object-cover opacity-25"
    />
    <div class="relative z-10">
        <h2 class="text-center pt-20">Контакты</h2>
        <div class="max-w-lg p-10 flex flex-col gap-4">
            <div>
                Адрес:<br />
                Улица Лесников, 27, Красноярск, 660006
            </div>
            <div>
                Телефон:<br />
                <a href="tel:+7 (999) 999-99-99"> +7 (999) 999-99-99 </a>
            </div>
            <div>
                Режим работы: <br />
                Ежедневно: 10:00-21:00
            </div>
        </div>
        <div id="map" class="w-full h-[400px]"></div>
    </div>
</section>
