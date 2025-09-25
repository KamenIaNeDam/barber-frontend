<script lang="ts">
	import { Header } from "@widgets/header";
    import Footer from "@widgets/footer/ui/Footer.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<!-- <link rel="icon" href={favicon} /> -->
	<title>Main title</title>
</svelte:head>

<Header />
{@render children?.()}
<Footer />
