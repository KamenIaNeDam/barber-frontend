<script lang="ts">
    import Button from "@shared/ui/Button.svelte";
    import type { FeedbackFormData } from "../model/types";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher<{ submit: FeedbackFormData }>();

    let form: FeedbackFormData = {
        fullName: "",
        contact: "",
        message: "",
    };

    function handleSubmit() {
        dispatch("submit", form);
        form = { fullName: "", contact: "", message: "" }; // reset
    }
</script>

<form
    class="w-full max-w-md mx-auto space-y-4"
    on:submit|preventDefault={handleSubmit}
>
    <div>
        <label class="text-sm font-medium mb-1"
            >ФИО
            <input
                type="text"
                bind:value={form.fullName}
                required
                class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-700 outline-none"
            />
        </label>
    </div>

    <div>
        <label class="text-sm font-medium mb-1"
            >Контакт (почта или телефон)
            <input
                type="text"
                bind:value={form.contact}
                required
                class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-700 outline-none"
            />
        </label>
    </div>

    <div>
        <label class="text-sm font-medium mb-1"
            >Текст
            <textarea
                bind:value={form.message}
                rows="4"
                required
                class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-700 outline-none"
            ></textarea>
        </label>
    </div>
    <div class="w-full grid place-items-center">
        <Button
            label="Отправить"
            type="submit"
            onClick={() => {}}
            variant="secondary"
        />
    </div>
    <!-- <button
    type="submit"
    class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
  >
    Отправить
  </button> -->
</form>
