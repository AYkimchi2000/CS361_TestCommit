<script>
	import { arr, validateNote } from "$lib";
	import Navbar from "$lib/Navbar.svelte";
</script>
<Navbar></Navbar>
<div id="page" class="h-dvh w-full flex flex-col overflow-hidden">

	<div class="h-dvh w-full flex flex-row overflow-hidden">
		<div id="input-column" class="w-1/2 p-4 bg-blue-100 flex-1 overflow-y-auto ">
			{#if arr.length === 0}
				<button id="empty chords array save" class="flex w-fit cursor-pointer gap-2 items-center p-2 m-1 bg-white border italic hover:bg-sky-500" onclick={()=>{arr.splice(1, 0, [""])}}>ClickThis to create a chord</button>
			{/if}
			{#each arr as chord, chord_index}
				<div id="chord-row" class="flex flex-wrap w-fit bg-gray-300 p-2 items-center">
					<div class="font-bold px-2">chord {chord_index + 1}</div>
					
					<div class="flex gap-1">
						<button id="+chord" class="px-2 py-1 cursor-pointer bg-gray-400 hover:bg-sky-500 border" onclick={()=>{arr.splice(chord_index, 1)}}>-Chord</button>
						<button id="-chord" class="px-2 py-1 cursor-pointer bg-gray-400 hover:bg-sky-500 border" onclick={()=>{arr.splice(chord_index+1, 0, [""])}}>+Chord</button>
					</div>
				
					{#if chord.length === 0}
						<button class="px-3 py-1 bg-white border cursor-pointer italic hover:bg-sky-500" onclick={()=>{chord.splice(1, 0, "")}}>add a note</button>
					{/if}  
				
					{#each chord as note, note_index}
						<div id="note-column" class="flex items-center gap-1 bg-gray-200 p-1 border border-gray-400">
							<input bind:value={chord[note_index]} placeholder="Note" class="field-sizing-content min-w-[6ch] border px-1 {!validateNote(chord[note_index]) ? 'border-red-500 bg-red-50' : 'border-gray-300'}"/>
							<button class="px-1 bg-gray-400 cursor-pointer hover:bg-sky-500 border" onclick={()=>{chord.splice(note_index+1, 0, "")}}>+</button>
							<button class="px-1 bg-gray-400 cursor-pointer hover:bg-sky-500 border" onclick={()=>{chord.splice(note_index, 1)}}>-</button>
						</div>
					{/each}
				</div>
			{/each}


			<pre>{JSON.stringify(arr, null, 2)}</pre>
		</div>
		<div id="output-column" class="w-1/2 p-4 bg-green-100 border-r overflow-y-auto">
			
		</div>
	</div>
</div>