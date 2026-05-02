<svelte:window 
	onkeydown={(e) => {
		const isZ = e.key.toLowerCase() === 'z';
		const isMod = e.ctrlKey || e.metaKey;

		if (isMod && isZ) {
			e.preventDefault();
			e.shiftKey ? console.log('Redo') : console.log('Undo');
		}
	}} 
/>