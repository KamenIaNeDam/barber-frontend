<script lang="ts">
  import * as Breadcrumb from "@shared/ui/breadcrumb/index.js";
    import AdminSocialMedias from "@widgets/admin-social-media/ui/AdminSocialMedias.svelte";
    let {data} = $props()
</script>


<Breadcrumb.Root >
    <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/admin">Главная</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Соц.Сети</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
</Breadcrumb.Root>
<AdminSocialMedias contacts={data.socialMedias} />
