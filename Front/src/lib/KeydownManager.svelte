<script>
	import { commandMonitor } from "./commands/commandMonitor.svelte";
</script>

<svelte:window 
	onkeydown={(e) => {
		const isZ = e.key.toLowerCase() === 'z';
		const isMod = e.ctrlKey || e.metaKey;

		if (isMod && isZ) {
			e.preventDefault();
			e.shiftKey ? commandMonitor.redo() : commandMonitor.undo();
		}
	}} 
/>