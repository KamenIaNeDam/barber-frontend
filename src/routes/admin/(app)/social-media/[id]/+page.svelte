<script lang="ts">
    import AdminSocialMedia from '@features/admin-social-media/ui/AdminSocialMedia.svelte';

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
          <Breadcrumb.Link href="/admin/social-media">Соц.Сети</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>{data.socialMedia.id}</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
</Breadcrumb.Root>
    <AdminSocialMedia socialMedia={data.socialMedia} form={data.form}/>
