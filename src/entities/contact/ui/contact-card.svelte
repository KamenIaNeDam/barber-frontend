<script lang="ts">
    import type { ContactModel } from "../model/contact";
    import { contactIcons } from "./icons";
    export let contact: ContactModel;
</script>

<a href={contact.url} class="">
     <svelte:component this="{contactIcons[contact.type]}" />
</a>
