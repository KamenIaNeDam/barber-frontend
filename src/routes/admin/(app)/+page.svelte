<script>
    import AdminMap from "@features/admin-map/ui/AdminMap.svelte";
    import Seo from "@features/admin-seo/ui/Seo.svelte";
    import AdminContacts from "@widgets/admin-contact/ui/AdminContacts.svelte";
    import AdminServices from "@widgets/admin-service/ui/AdminServices.svelte";
    export let data;
</script>
<div class = 'px-5'>
    <h1>Панель администратора</h1>
    <Seo seo={data.seo} />

    <AdminContacts contacts={data.contacts} />
    <AdminMap location={data.location}/>

    <AdminServices services = {data.services} />
</div>

