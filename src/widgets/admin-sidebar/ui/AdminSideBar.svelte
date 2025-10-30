<script lang="ts">
  import * as Sidebar from "@shared/ui/sidebar/index.js";
  import * as DropdownMenu from "@shared/ui/dropdown-menu/index"
  import ChevronUp from "@lucide/svelte/icons/chevron-up"
    import { logout } from "@features/auth/logout/logout";
    import { goto } from "$app/navigation";
    import Button from "@shared/ui/button/button.svelte";


  let { user } = $props()

  import { useSidebar } from "@shared/ui/sidebar/index.js";
    import { adminMenu } from "@shared/constants/menu";
  const sidebar = useSidebar();

  let width: number = $state(0);




   const handleOnLogout =  async () => {
       await logout()
       goto("/admin/login")
   }
</script>

<svelte:window bind:innerWidth={width} />

<Sidebar.Root side="right" class="font-[Manrope]">
  <Sidebar.Header class="font-[Manrope] p-4">Панель администратора</Sidebar.Header>
  <Sidebar.Content>
    <Sidebar.Group>
        <!-- <Sidebar.GroupLabel>Меню</Sidebar.GroupLabel> -->
        <Sidebar.GroupContent>
                <Sidebar.Menu class="font-[Manrope]">
                  {#each adminMenu as item (item.title)}
                    <Sidebar.MenuItem class="w-full">
                      <Sidebar.MenuButton>
                        {#snippet child({ props })}

                            <Button type="button" class="w-full justify-start" variant="link" onclick={() => {
                              goto(item.url);
                              if (width < 768){
                              sidebar.toggle()
                              }
                            }}>{item.title}</Button>
                        {/snippet}
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                  {/each}
                </Sidebar.Menu>
              </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
  <Sidebar.Footer >
      <Sidebar.Menu class="font-[Manrope]">
              <Sidebar.MenuItem>
                  <DropdownMenu.Root>
                      <DropdownMenu.Trigger>
                                    {#snippet child({ props })}
                                      <Sidebar.MenuButton
                                        {...props}
                                        class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground font-[Manrope]"
                                      >
                                        {user?.email}
                                        <ChevronUp class="ml-auto" />
                                      </Sidebar.MenuButton>
                                    {/snippet}
                                  </DropdownMenu.Trigger>
                                  <DropdownMenu.Content
                                    side="top"
                                    class="w-(--bits-dropdown-menu-anchor-width) font-[Manrope]"
                                  >
                                    <DropdownMenu.Item  onclick={handleOnLogout}>
                                      <span>Выйти</span>
                                    </DropdownMenu.Item>
                                  </DropdownMenu.Content>
                  </DropdownMenu.Root>
              </Sidebar.MenuItem></Sidebar.Menu>
  </Sidebar.Footer>
</Sidebar.Root>
