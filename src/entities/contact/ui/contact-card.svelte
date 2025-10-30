<script lang="ts">
    import type { SocialMediaModel } from "@entities/social-media/model/types";
    import { contactIcons } from "./icons";
    export let contact: SocialMediaModel;
</script>

<a  class="" href={contact.url} target="_blank" rel="noopener noreferrer">
     <svelte:component this="{contactIcons[contact.type]}" />
</a>
