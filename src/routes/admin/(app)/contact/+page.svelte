<script>
    import * as Breadcrumb from "@shared/ui/breadcrumb/index.js";
    import AdminContacts from "@widgets/admin-contact/ui/AdminContacts.svelte";

    export let data;
</script>


<Breadcrumb.Root >
    <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/admin">Главная</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Контакты</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
</Breadcrumb.Root>
<AdminContacts contacts={data.contacts} />
