<script lang="ts">
  import * as Breadcrumb from "@shared/ui/breadcrumb/index.js";
    import AdminSocialMedia from "@features/admin-social-media/ui/AdminSocialMedia.svelte";

    let {data} = $props()
</script>
<Breadcrumb.Root >
    <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/admin">Главная</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/admin/social-media">Соц.Сети</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Создание</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
</Breadcrumb.Root>
    <AdminSocialMedia form={data.form} />
