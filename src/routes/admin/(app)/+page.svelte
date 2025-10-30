<script>
  import * as Empty from "@shared/ui/empty/index.js";
  import { Button } from "@shared/ui/button/index.js";
  import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
    import { adminMenu } from "@shared/constants/menu";
</script>

<Empty.Root>
  <Empty.Header>
    <Empty.Media variant="icon">
      <!-- <FolderCodeIcon /> -->
    </Empty.Media>
    <Empty.Title>Тут пока ничего нет</Empty.Title>
    <Empty.Description>
      Я еще не придумал, что сюда вставить)
    </Empty.Description>
  </Empty.Header>
  <Empty.Content>
    <div class="flex flex-col gap-2">
        {#each adminMenu as item, index}
            <Button href={item.url} variant = {index%2 === 0 ? "default" : "outline"}>{item.title}</Button>
        {/each}
    </div>
  </Empty.Content>
</Empty.Root>
