<script lang="ts">
    import AdminFeedbacks from '@widgets/admin-feedback/ui/AdminFeedbacks.svelte';

    export let data

</script>

<div class="p-4">

<AdminFeedbacks feedbacks={data.feedbacks}/>
</div>
