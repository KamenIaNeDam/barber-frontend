<script lang="ts">
    import { toasts } from './store';
</script>

<div class="flex flex-col gap-2">
    {#each $toasts as toast (toast.id)}
        <div class="px-4 py-2 rounded text-white" class:bg-green-600={toast.type==='success'} class:bg-red-600={toast.type==='error'}>
            {toast.message}
        </div>
    {/each}
</div>
