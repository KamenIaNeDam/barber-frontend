<script>
    import Seo from "@features/admin-seo/ui/Seo.svelte";
    export let data;
</script>
<div class = 'px-5'>
    <h1>Панель администратора</h1>
    <Seo seo={data.seo} />

</div>

