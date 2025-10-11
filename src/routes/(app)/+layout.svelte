<script lang="ts">
	import { Header } from "@widgets/header";
	import Footer from "@widgets/footer/ui/Footer.svelte";
	import Modal from "@shared/ui/Modal/Modal.svelte";
	import { onMount } from "svelte";
	import { openModal } from "@shared/stores/modal";
	import CommingSoonModal from "@widgets/comming-soon/CommingSoonModal.svelte";
	import { PUBLIC_YCLIENTS_SCRIPT } from "$env/static/public";




    export let data;

	onMount(() => {
		openModal(CommingSoonModal, {medias: data.socialMedias});
	});

</script>

<svelte:head>
	<!-- <link rel="icon" href={favicon} /> -->
	{#if PUBLIC_YCLIENTS_SCRIPT}
		<script
			type="text/javascript"
			src={PUBLIC_YCLIENTS_SCRIPT}
			charset="UTF-8"
		></script>
	{/if}
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

	<script
        src="https://smartcaptcha.yandexcloud.net/captcha.js?render=onload&onload=onloadFunction"
        defer
    ></script>
</svelte:head>

<Header socialMedias={data.socialMedias}/>
 <slot />
<Modal />
<Footer socialMedias={data.socialMedias} contacts={data.contacts} />
