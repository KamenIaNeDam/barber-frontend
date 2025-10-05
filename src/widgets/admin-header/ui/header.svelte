<script lang="ts">
    import { goto } from "$app/navigation";
    import type { User } from "@entities/user/model/user";
    import { logout } from "@features/auth/logout/logout";
    import Button from "@shared/ui/Button.svelte";

    export let user: User

    const handleOnLogout =  async () => {
        await logout()
        goto("/admin/login")
    }
</script>


<div class="flex justify-between p-4 items-center">
    <div>
        <a href="/admin">

            {user.id} | {user.email}
        </a>
    </div>
    <div>
        <Button onClick={handleOnLogout} type="button" label="Выйти" variant="secondary"/>
    </div>
</div>