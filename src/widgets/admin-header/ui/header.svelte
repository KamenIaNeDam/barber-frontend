<script lang="ts">
    import Button from "@shared/ui/button/button.svelte";
    import * as Sidebar from "@shared/ui/sidebar/index"
</script>


<div class="flex justify-between p-4 items-center">
    <Button href="/admin" variant="link" class="p-0"><h1 class="!text-lg">Гётин Админ</h1></Button>
    <Sidebar.Trigger  class=""/>

</div>
