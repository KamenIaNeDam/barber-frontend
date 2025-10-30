<script lang="ts">
    import AdminService from '@features/admin-service/ui/AdminService.svelte';
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
          <Breadcrumb.Link href="/admin/service">Услуги</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>{data.service.title}</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
</Breadcrumb.Root>
    <AdminService service={data.service} form={data.form}/>
