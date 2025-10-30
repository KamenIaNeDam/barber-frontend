<script lang="ts">
    import AdminFeedbacks from '@widgets/admin-feedback/ui/AdminFeedbacks.svelte';
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
          <Breadcrumb.Page>Форма обратной связи</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
</Breadcrumb.Root>
<AdminFeedbacks feedbacks={data.feedbacks}/>
