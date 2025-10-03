<script lang="ts">
	import "../app.css";
	import Toast from "@shared/ui/toast/Toast.svelte";
</script>

<slot />

<div class="fixed bottom-4 right-4"><Toast /></div>
