<script lang="ts">
    import { goto } from "$app/navigation";
    import type { LoginResponse } from "@entities/auth/model";
    import { api } from "@shared/api/base";
    import { addToast } from "@shared/ui/toast/store";

    export let email = "";
    export let error = null;

    let password = "";

    async function handleSubmit(event: Event) {
        event.preventDefault(); // prevent default HTML form submission
        let access_token = null
        try {
            const res = await api<LoginResponse>(fetch, "/admin/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });
            access_token = res.access_token
            
        } catch (error) {
            addToast(String(error), "error");
            return
        }
            document.cookie = `access_token=${access_token}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
            console.log(document.cookie)
            goto("/admin")
    }
</script>

<div
    class="flex items-center justify-center min-h-screen bg-gray-100 text-black"
>
    <form class="bg-white p-8 rounded shadow-md w-96" on:submit={handleSubmit}>
        <h1 class="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        <div class="mb-4">
            <label class="block mb-1" for="email">Email</label>
            <input
                id="email"
                name="email"
                type="email"
                class="w-full border px-3 py-2 rounded"
                bind:value={email}
                required
            />
        </div>

        <div class="mb-6">
            <label class="block mb-1" for="password">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                class="w-full border px-3 py-2 rounded"
                bind:value={password}
                required
            />
        </div>

        {#if error}
            <p class="text-red-500 mb-4">{error}</p>
        {/if}

        <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
            Login
        </button>
    </form>

    <!-- Toasts -->
    <!-- <div class="fixed bottom-4 right-4"><Toast /></div> -->
</div>
