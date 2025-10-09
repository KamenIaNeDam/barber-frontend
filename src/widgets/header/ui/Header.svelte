<script lang="ts">
    import type { SocialMediaModel } from "@entities/social-media/model/socia-media";

  // import DesktopHeader from "./DesktopHeader.svelte";
  import MobileHeader from "./MobileHeader.svelte";
  export let socialMedias: SocialMediaModel[] = []
</script>

<!-- <DesktopHeader /> -->
<MobileHeader socialMedias={socialMedias}/>
