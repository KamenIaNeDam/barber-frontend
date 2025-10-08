<script lang="ts">
    import AdminGallery from '@features/admin-gallery/ui/AdminGallery.svelte';

    export let data
</script>

<AdminGallery gallery={data.gallery} />