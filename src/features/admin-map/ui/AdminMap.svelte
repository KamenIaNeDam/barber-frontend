<script lang="ts">
    import { PUBLIC_YANDEX_MAPS_API_KEY } from "$env/static/public";
    import { setLocation } from "@entities/location/api/admin-location";
    import type { LocationModel } from "@entities/location/model/location";
    import { debounce } from "@shared/lib/debounce";
    import { tokenStore } from "@shared/stores/auth";
    import { addToast } from "@shared/ui/toast/store";

    // 55.981218, 92.801386
    // export let long: number = 92.801386;
    // export let lat: number = 55.981218;

    export let location: LocationModel = {
        long: 92.801386,
        lat: 55.981218,
    };

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
                draggable: true,
                onDragMove: debounce(async (coordinates: number[]) => {
                    console.log("Debounced coords:", coordinates);

                    location = {
                        long: coordinates[0],
                        lat: coordinates[1],
                    };

                    try{
                        await setLocation(fetch, $tokenStore, location)
                    } catch (error) {
                        addToast(String(error), "error")
                        return
                    }

                    addToast("Карта успешно обновлена", "success")

                }, 300),
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

<section>
    <div id="map" class="w-full h-[400px]"></div>
</section>
