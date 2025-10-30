<script lang="ts">
    import { uploadImage } from "@entities/image/api";
    import { api } from "@shared/api/base";
    import { tokenStore } from "@shared/stores/auth";
    import { PUBLIC_API } from "$env/static/public";
    import type { ImageModel } from "@entities/image/model";
    import { toast } from "svelte-sonner";
    import Spinner from "../spinner/spinner.svelte";

  let file = null;
  export let previewUrl: string|null = null;
  let error = '';

  let loading = false;
  // export let setLoading: ((loading: boolean) => void)
  export let onUpload: ((image: ImageModel) => void) | undefined = undefined

  // Handle file input
  async function handleFileChange(event: any) {
    const selected = event.target.files[0];
    if (!selected) return;

    if (!selected.type.startsWith('image/')) {
      error = 'Please select an image file.';
      file = null;
      previewUrl = null;
      return;
    }
    loading = true
    try{
        const img = await uploadImage(fetch, $tokenStore, selected)
        toast.success("Uploaded")
        previewUrl = PUBLIC_API+ img.url
        if (onUpload){
          onUpload(img)
        }

    } catch {
        toast.error("Upload faild")
    }
    loading=false
  }

</script>

<div class="">
  <!-- File Input -->
  {#if loading}

      <Spinner class="mx-auto my-4 size-8"/>
      {/if}
   {#if previewUrl && !loading}
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
