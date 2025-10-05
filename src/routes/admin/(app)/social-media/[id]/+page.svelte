<script lang="ts">
    import AdminContact from '@features/admin-contact/ui/AdminContact.svelte';
    import AdminSocialMedia from '@features/admin-social-media/ui/AdminSocialMedia.svelte';

    export let data;
</script>

    <AdminSocialMedia contact={data.socialMedia} />