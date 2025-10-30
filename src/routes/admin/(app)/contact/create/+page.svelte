<script lang="ts">
  import * as Breadcrumb from "@shared/ui/breadcrumb/index.js";
    import AdminContact from "@features/admin-contact/ui/AdminContact.svelte";

    let {data} = $props()
</script>
<Breadcrumb.Root >
    <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/admin">Главная</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/admin/contact">Контакты</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Создание</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
</Breadcrumb.Root>
    <AdminContact  form={data.form}/>
