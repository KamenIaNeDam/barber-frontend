<script lang="ts">
    import AdminContact from '@features/admin-contact/ui/AdminContact.svelte';

    export let data;
</script>

    <AdminContact contact={data.contact} />