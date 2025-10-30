<script lang="ts">
    import AdminFeedback from '@features/admin-feedback/ui/AdminFeedback.svelte';
    import * as Breadcrumb from "@shared/ui/breadcrumb/index.js";

    export let data;
</script>

<Breadcrumb.Root >
    <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/admin">Главная</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/admin/feedback">Форма обратной связи</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>{data.feedback.id}</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
</Breadcrumb.Root>
    <AdminFeedback feedback={data.feedback} form={data.form}/>
