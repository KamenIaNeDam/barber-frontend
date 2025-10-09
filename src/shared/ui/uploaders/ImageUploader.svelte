<script lang="ts">
    import { uploadImage } from "@entities/image/api";
    import { api } from "@shared/api/base";
    import { tokenStore } from "@shared/stores/auth";
    import { addToast } from "../toast/store";
    import { PUBLIC_API } from "$env/static/public";
    import type { ImageModel } from "@entities/image/model";

  let file = null;
  export let previewUrl: string|null = null;
  let error = '';

  export let setLoading: ((loading: boolean) => void)
  export let onUpload: ((image: ImageModel) => void) | undefined = undefined

  // Handle file input
  async function handleFileChange(event: any) {
    const selected = event.target.files[0];
    if (!selected) return;

    // ✅ Optional: validate file type and size
    if (!selected.type.startsWith('image/')) {
      error = 'Please select an image file.';
      file = null;
      previewUrl = null;
      return;
    }
    setLoading(true)
    try{
        const img = await uploadImage(fetch, $tokenStore, selected)
        addToast("Uploaded", "success")
        previewUrl = PUBLIC_API+ img.url
        if (onUpload){
          onUpload(img)
        }

    } catch {
        addToast("Upload faild", "error")
    }
    setLoading(false)
  }

</script>

<div class="">
  <!-- File Input -->
   {#if previewUrl}
    <div class="space-y-2">
      <img src={previewUrl} alt="Preview" class="w-full rounded-lg object-cover h-auto" />
      <div class="flex justify-between">
      </div>
    </div>
  {/if}
  <label
    for="fileInput"
    class="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition"
  >
    <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 8v-4m0 0l4 4m-4-4l-4 4" />
    </svg> -->
    <p class="text-gray-500">Нажмите, чтобы выбрать изображение</p>
    <input
      id="fileInput"
      type="file"
      accept="image/*"
      class="hidden"
      on:change={handleFileChange}
    />
  </label>

  {#if error}
    <p class="text-red-500 text-sm">{error}</p>
  {/if}


</div>
