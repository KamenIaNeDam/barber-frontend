<script lang="ts">
    import { goto } from "$app/navigation";
    import { loginRequestSchema, type LoginResponse } from "@entities/auth/model";
    import { api } from "@shared/api/base";
    import { toast } from "svelte-sonner";
    import { superForm } from "sveltekit-superforms";
    import { zod4Client, zodClient } from "sveltekit-superforms/adapters";
    import * as Form from "@shared/ui/form/index"
    import Input from "@shared/ui/input/input.svelte";
    import Button from "@shared/ui/button/button.svelte";


    let {data} = $props()

    const form = superForm(data.form, {
        validators: zod4Client(loginRequestSchema),
    });

    const { form: formData, errors, validateForm } = form;


    async function handleSubmit(event: Event) {
        event.preventDefault(); // prevent default HTML form submission
        const validationResult = await validateForm()
        if (!validationResult.valid ) {
          errors.set(validationResult.errors)
          toast.error("Ошибка в заполнении формы")
          return
        }
        let access_token = null
        try {
            const res = await api<LoginResponse>(fetch, "/admin/login", {
                method: "POST",
                body: JSON.stringify({ email: $formData.email,password: $formData.password }),
            });
            access_token = res.access_token

        } catch (error) {
            toast.error(String(error))
            return
        }
            document.cookie = `access_token=${access_token}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
            goto("/admin")
    }
</script>

<div
    class="flex items-center justify-center h-screen w-full bg-gray-100 text-black"
>
    <div class="w-full max-w-md space-y-4 px-4">


    <h1 class="text-center">Вход</h1>
    <form onsubmit="{handleSubmit}" class="space-y-4">
        <Form.Field form={form} name="email">
            <Form.Control>
                {#snippet children(attrs)}
                <!-- <Form.Label>Почта</Form.Label> -->
                <Input {...attrs} bind:value={$formData.email} type="email" placeholder="email"/>
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
        <Form.Field form={form} name="password">
            <Form.Control>
                {#snippet children(attrs)}
                <!-- <Form.Label>Пароль</Form.Label> -->
                <Input {...attrs} bind:value={$formData.password} type="password" placeholder="пароль"/>
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
        <div class="flex justify-center items-center">

        <Button type="submit">Войти</Button>
        </div>
    </form>
    </div>
</div>
