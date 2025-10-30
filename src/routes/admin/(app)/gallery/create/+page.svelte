<script>
    import AdminGalleryCreate from "@features/admin-gallery/ui/AdminGalleryCreate.svelte";
    import * as Breadcrumb from "@shared/ui/breadcrumb/index.js";


    let {data} = $props()
</script>

<Breadcrumb.Root >
    <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/admin">Главная</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/admin/gallery">Галерея</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Создание</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
</Breadcrumb.Root>
<AdminGalleryCreate form={data.form}/>
