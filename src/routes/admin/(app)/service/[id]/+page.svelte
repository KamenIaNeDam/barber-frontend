<script lang="ts">
    import AdminService from '@features/admin-service/ui/AdminService.svelte';

    export let data;
</script>

    <AdminService service={data.service} />