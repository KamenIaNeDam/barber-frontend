<script lang="ts">
    import AdminGalleryUpdate from '@features/admin-gallery/ui/AdminGalleryUpdate.svelte';
    import * as Breadcrumb from "@shared/ui/breadcrumb/index.js";

    export let data
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
          <Breadcrumb.Page>Изображение - {data.gallery.id}</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
</Breadcrumb.Root>
<AdminGalleryUpdate gallery={data.gallery} form={data.form}/>
