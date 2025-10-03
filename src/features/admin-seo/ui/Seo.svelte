<script lang="ts">
    import { setSeo } from "@entities/seo/api/seo";
    import type { Seo } from "@entities/seo/model/seo";
    import { tokenStore } from "@shared/stores/auth";
    import { addToast } from "@shared/ui/toast/store";

    export let seo: Seo = {}

    const handelSubmit = async () => {
        seo = await setSeo(fetch, $tokenStore, seo)
        addToast("Успешно обновлено", 'success')
    }

</script>

<div class="py-5">
    <form on:blur={handelSubmit}>
        <div class="mb-4">
            <label class="block mb-1" for="title">SEO заголовок</label>
            <input
                id="title"
                name="title"
                type="text"
                class="w-full border px-3 py-2 rounded"
                on:blur={handelSubmit}
                bind:value={seo.title}
            />
        </div>

        <div class="mb-4">
            <label class="block mb-1" for="description">SEO Описание</label>
            <input
                id="description"
                name="description"
                type="text"
                class="w-full border px-3 py-2 rounded"
                on:blur={handelSubmit}
                bind:value={seo.description}
            />
        </div>

        <div class="mb-4">
            <label class="block mb-1" for="email">SEO Ключевые слова</label>
            <input
                id="keywords"
                name="keywords"
                type="text"
                class="w-full border px-3 py-2 rounded"
                on:blur={handelSubmit}
                bind:value={seo.keywords}
            />
        </div>
    </form>
</div>