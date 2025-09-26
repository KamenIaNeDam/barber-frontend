<script lang="ts">
  import { fly } from 'svelte/transition';
  import { onDestroy } from 'svelte';
    import { modalStore, closeModal } from '@shared/stores/modal';
    import CloseIcon from '../icons/CloseIcon.svelte';

  let modal: { isOpen: boolean; content: any | null };
  const unsubscribe = modalStore.subscribe(v => {
    modal = v;
    if (typeof document !== 'undefined') {
      if (v.isOpen) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    }
  });
  onDestroy(unsubscribe);

</script>

{#if modal.isOpen && modal.content}
  <!-- Backdrop -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-100000"
    on:click={closeModal}
  >
    <!-- Modal -->
    <div
      class="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg"
      transition:fly={{ y: 30, duration: 200 }}
      on:click|stopPropagation
    >
      <!-- Close button -->
      <button
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        on:click={closeModal}
      >
        <CloseIcon width=24 height=24/>
      </button>

      <!-- Modal content -->
      <svelte:component this={modal.content}/>
    </div>
  </div>
{/if}
