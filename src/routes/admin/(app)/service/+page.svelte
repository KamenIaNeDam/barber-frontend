<script lang="ts">
  import * as Breadcrumb from "@shared/ui/breadcrumb/index.js";
    import AdminServices from "@widgets/admin-service/ui/AdminServices.svelte";
    let {data} = $props()
</script>


<Breadcrumb.Root >
    <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/admin">Главная</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Услуги</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
</Breadcrumb.Root>
<AdminServices services={data.services} />
