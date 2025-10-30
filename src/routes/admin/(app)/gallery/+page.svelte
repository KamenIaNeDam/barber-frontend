<script lang="ts">
  import * as Breadcrumb from "@shared/ui/breadcrumb/index.js";
    import AdminGalleries from "@widgets/admin-gallery/ui/AdminGalleries.svelte";
    let {data} = $props()
</script>


<Breadcrumb.Root >
    <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/admin">Главная</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Галерея</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
</Breadcrumb.Root>
<AdminGalleries gallery={data.galleries} />
