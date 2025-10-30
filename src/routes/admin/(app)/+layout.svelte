<script lang="ts">
    import { tokenStore } from "@shared/stores/auth.js";
    import Header from "@widgets/admin-header/ui/header.svelte";
    import * as Sidebar from "@shared/ui/sidebar/index.js"
    import AdminSideBar from "@widgets/admin-sidebar/ui/AdminSideBar.svelte";

    let {data, children} = $props()

    tokenStore.set(data.accessToken);
</script>

    <Sidebar.Provider>
    <main class="bg-gray-100 text-black w-full ">
        <Header/>
        <div class="px-4">

        {@render children()}
        </div>
    </main>
    <AdminSideBar user={data.user}/>

    </Sidebar.Provider>
