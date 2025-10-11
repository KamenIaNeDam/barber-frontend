<script lang="ts">
    import { goto } from "$app/navigation";
    import { tokenStore } from "@shared/stores/auth";
    import Button from "@shared/ui/Button.svelte";
    import { addToast } from "@shared/ui/toast/store";
    import type { AdminFeedbackCreateModel, AdminFeedbackModel } from "@entities/feedback/model";
    import { createFeedback, updateFeedback, deleteFeedback } from "@entities/feedback/api";

    export let feedback: AdminFeedbackModel | undefined = undefined;
    let loadingState = false

    let payload: AdminFeedbackCreateModel = {
      fio: feedback?.fio || "",
      contact: feedback?.contact || "",
      text: feedback?.text || "",
      processed: feedback?.processed || false,
      admin_text: feedback?.admin_text || "",
    };

    const handelSubmit = async () => {

        if (!feedback) {
            return await createFeedbackHandler();
        }

        return await updateFeedbackHandler();
    };

    const createFeedbackHandler = async () => {
        try {
            const res = await createFeedback(fetch, $tokenStore, payload);
        } catch (error) {
            addToast(String(error), "error");
            return;
        }
        addToast("Успешно создано", "success");
    };

    const updateFeedbackHandler = async () => {
        if (!feedback?.id) {
            addToast("Что-то пошло не так", "error");
        }
        try {
            const res = await updateFeedback(
                fetch,
                $tokenStore,
                feedback?.id,
                payload,
            );
        } catch (error) {
            addToast(String(error), "error");
            return;
        }
        addToast("Успешно создано", "success");
    };

    const deleteFeedbackHandler = async () => {
        if (!feedback?.id) {
            addToast("Что-то пошло не так", "error");
        }
        try {
            const res = await deleteFeedback(
                fetch,
                $tokenStore,
                feedback?.id,
            );
        } catch (error) {
            addToast(String(error), "error");
            return;
        }
        addToast("Успешно создано", "success");
        goto("/admin/feedback")
    }
</script>

<div class="p-5">
    <div class="flex justify-between items-center my-5">
        {#if feedback}<h2>Обратная связь - {feedback.id}</h2>
        <Button onClick={deleteFeedbackHandler} label="Удалить" variant = "secondary"/>

        {:else}
            <h2>Создание Обратной связи</h2>
        {/if}
    </div>
    <!-- <h2 class="my-5">Контак</h2> -->
    <form on:submit={handelSubmit}>



        <div class="mb-4">
            <label class="block mb-1" for="fio">ФИО</label>
            <input
                id="fio"
                name="fio"
                type="text"
                class="w-full border px-3 py-2 rounded"
                required
                disabled={!!feedback}
                bind:value={payload.fio}
            />
        </div>

        <div class="mb-4">
            <label class="block mb-1" for="contact">Контакт</label>
            <input
                id="contact"
                name="contact"
                type="text"
                class="w-full border px-3 py-2 rounded"
                required
                disabled={!!feedback}
                bind:value={payload.contact}
            />
        </div>

        <div class="mb-4">
            <label class="block mb-1" for="text">Текст</label>
            <textarea
                bind:value={payload.text}
                rows="4"
                required
                disabled={!!feedback}
                class="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-700 outline-none"
            ></textarea>
        </div>

        <div class="mb-4">
            <label class="block mb-1" for="processed">Обработан</label>
            <input
                id="processed"
                name="processed"
                type="checkbox"
                class="w-full border px-3 py-2 rounded"
                bind:checked={payload.processed}
            />
        </div>

        <div class="mb-4">
            <label class="block mb-1" for="admin_text">Текст модерации</label>
            <input
                id="admin_text"
                name="admin_text"
                type="text"
                class="w-full border px-3 py-2 rounded"
                bind:value={payload.admin_text}
            />
        </div>
        <Button
            label="{loadingState? "Загрузка":feedback ? 'Сохранить': 'Создать'}"
            onClick={() => {}}
            type="submit"
            disabled={loadingState}
            variant="secondary"
        />
    </form>
</div>
