<script lang="ts">
	import { Header } from "@widgets/header";
	import Footer from "@widgets/footer/ui/Footer.svelte";
	import Modal from "@shared/ui/Modal/Modal.svelte";
	import { onMount } from "svelte";
	import { openModal } from "@shared/stores/modal";
	import CommingSoonModal from "@widgets/comming-soon/CommingSoonModal.svelte";

	let { children } = $props();

	onMount(() => {
		openModal(CommingSoonModal);
		// const timer = setTimeout(() => {
		// 	openModal(CommingSoonModal);
		// }, 1000);

		// return () => clearTimeout(timer);
	});
</script>

<svelte:head>
	<!-- <link rel="icon" href={favicon} /> -->
	<title>Main title</title>
</svelte:head>

<Header />
{@render children?.()}
<Modal />
<Footer />
