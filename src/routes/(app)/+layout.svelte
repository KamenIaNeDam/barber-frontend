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
	<script
		type="text/javascript"
		src="https://w1709787.yclients.com/widgetJS"
		charset="UTF-8"
	></script>
	<!-- Yandex.Metrika counter -->
	<script type="text/javascript">
		(function (m, e, t, r, i, k, a) {
			m[i] =
				m[i] ||
				function () {
					(m[i].a = m[i].a || []).push(arguments);
				};
			m[i].l = 1 * new Date();
			for (var j = 0; j < document.scripts.length; j++) {
				if (document.scripts[j].src === r) {
					return;
				}
			}
			((k = e.createElement(t)),
				(a = e.getElementsByTagName(t)[0]),
				(k.async = 1),
				(k.src = r),
				a.parentNode.insertBefore(k, a));
		})(
			window,
			document,
			"script",
			"https://mc.yandex.ru/metrika/tag.js?id=104291766",
			"ym",
		);

		ym(104291766, "init", {
			ssr: true,
			webvisor: true,
			clickmap: true,
			ecommerce: "dataLayer",
			accurateTrackBounce: true,
			trackLinks: true,
		});
	</script>
	<noscript>
		<div>
			<img
				src="https://mc.yandex.ru/watch/104291766"
				style="position:absolute; left:-9999px;"
				alt=""
			/>
		</div>
	</noscript>
	<!-- /Yandex.Metrika counter -->
</svelte:head>

<Header />
{@render children?.()}
<Modal />
<Footer />
