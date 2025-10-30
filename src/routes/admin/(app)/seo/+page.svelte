<script lang="ts">
    import AdminMap from '@features/admin-map/ui/AdminMap.svelte';
    import Seo from '@features/admin-seo/ui/Seo.svelte';
    import * as Breadcrumb from "@shared/ui/breadcrumb/index.js";

  let {data} = $props()
</script>

<div class="space-y-5">
<Breadcrumb.Root >
    <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/admin">Главная</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>SEO</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
</Breadcrumb.Root>
<Seo seo={data.seo} form={data.form} />

<AdminMap location={data.location} />
</div>
