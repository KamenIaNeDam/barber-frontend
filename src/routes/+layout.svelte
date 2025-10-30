<script lang="ts">
	import "../app.css";
	import { Toaster } from "@shared/ui/sonner";
</script>

<slot />

<div class="fixed bottom-4 right-4"><Toaster /></div>
