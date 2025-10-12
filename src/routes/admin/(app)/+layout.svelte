<script lang="ts">
    import { tokenStore } from "@shared/stores/auth.js";
    import Header from "@widgets/admin-header/ui/header.svelte";
    import AdminMenu from "@widgets/admin-menu/ui/AdminMenu.svelte";
    import { onMount } from "svelte";

    export let data;
    tokenStore.set(data.accessToken);

    // onMount(() => {
    //   console.log("ACCESS TOKEN", data.accessToken)
    //     tokenStore.set(data.accessToken);
    // });
</script>

<div class="bg-gray-100 text-black min-h-screen">
    <Header user={data.user} />
    <AdminMenu/>
    <slot />
</div>
