<script lang="ts">
  export let label: string;
  export let variant: 'primary' | 'secondary' | 'outline' = 'primary';
  export let disabled = false;
  export let type: 'button' | 'submit' = 'button';
  export let onClick: (() => void) | undefined;
  export let _class: string = "";

  const base =
    'px-4 py-2 rounded transition-colors duration-200 focus:outline-none border';

  const variants = {
    primary: 'text-white hover:bg-blue-700 disabled:bg-blue-300',
    secondary: 'bg-white text-black hover:bg-blue-700 disabled:bg-gray-100 hover:text-white',
    outline:
      'border border-gray-400 text-gray-800 hover:bg-gray-100   disabled:text-gray-400'
  };
</script>

<button
  class={`${base} ${variants[variant]} cursor-pointer ${_class}`}
  {type}
  {disabled}
  on:click={onClick}
>
  {label}
</button>