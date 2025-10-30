<script lang="ts">
    import Button from '@shared/ui/button/button.svelte';
  import * as DropdownMenu from '@shared/ui/dropdown-menu/index'
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis-vertical'
    import DropdownMenuItem from '@shared/ui/dropdown-menu/dropdown-menu-item.svelte';
    let { id }: { id: number } = $props();

</script>
<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button
        {...props}
        variant="ghost"
        size="icon"
        class="relative size-8 p-0"
      >
        <EllipsisIcon />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
          <a href="/admin/contact/{id}">
      <DropdownMenuItem>
              Изменить
      </DropdownMenuItem>
          </a>
    <!-- <DropdownMenu.Item>Удалить</DropdownMenu.Item> -->
  </DropdownMenu.Content>
</DropdownMenu.Root>
