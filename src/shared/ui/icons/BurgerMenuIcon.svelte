<script>
    export let color = "currentColor";
    export let width = "2rem";
    export let height = "2rem";
    export let _class = "";
</script>

<svg
    {width}
    {height}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke={color}
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="{_class}"
>
    <path d="M4 18L20 18" />
    <path d="M4 12L20 12" />
    <path d="M4 6L20 6" />
</svg>
