<script lang="ts">
    import AdminFeedback from '@features/admin-feedback/ui/AdminFeedback.svelte';

    export let data;
</script>

    <AdminFeedback feedback={data.feedback} />
