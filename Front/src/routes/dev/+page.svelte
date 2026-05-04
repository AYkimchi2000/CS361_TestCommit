<script>
	import { appState } from "$lib/states.svelte";
	import { validateNote } from "$lib/util";
	import { updateRouteState } from "$lib/util";
	import { commandMonitor } from "$lib/commands/commandMonitor.svelte";
	import { command_addChord } from "$lib/commands/addChord";
    import { command_deleteChord } from "$lib/commands/deleteChord";
	import Navbar from "$lib/Navbar.svelte";
	import KeydownManager from "$lib/KeydownManager.svelte";
    import { command_addNote } from "$lib/commands/addNote";
	import { command_deleteNote } from "$lib/commands/deleteNote";
</script>

<div id="page" class="h-dvh w-full flex flex-col overflow-hidden">
	<Navbar updateRouteState={updateRouteState} ></Navbar>
	<div class="h-dvh w-full flex flex-row overflow-hidden">
		<div id="input-section" class="w-1/2 p-4 bg-blue-100 flex-1 overflow-y-auto ">
			<div id="fretcount-input" class="flex flex-wrap flex-row bg-gray-300 p-2 w-fit ">
				<div class="font-bold px-2" title={"The number of frets on your guitar"}>FretCount</div>
				<input 
				bind:value={appState.fretCount} 
				placeholder="default=22 " 
				class="field-sizing-content min-w-[6ch] border px-1"
				title={"The number of frets on your guitar"}
				/>
			</div>
			<div id="tuning-input" class="flex flex-wrap w-fit flex-row bg-gray-300 p-2">
				<div class="font-bold flex-wrap px-2" title="From left to right, Lowest string1 to string6">Tuning</div>
				<div class="flex flex-row flex-wrap">
					{#each appState.tuning as string, tuneString_index}
					<input bind:value={appState.tuning[tuneString_index]} placeholder={`String ${tuneString_index +1}`} class="field-sizing-content min-w-[6ch] border px-1"/>
					{/each}
				</div>
			</div>
			{#if appState.arr.length === 0}
				<button id="empty chords array save" class="flex w-fit cursor-pointer gap-2 items-center p-2 m-1 bg-white border italic hover:bg-sky-500" onclick={()=>{commandMonitor.execute(command_addChord(appState.arr, 0))}}>ClickThis to create a chord</button>
			{/if}

			{#each appState.arr as chord, chord_index}
				<div id="chord-row" class="flex flex-wrap w-fit bg-gray-300 p-2 items-center">
					<div class="font-bold px-2">chord {chord_index + 1}</div>
					
					<div class="flex">
						<button id="-chord" class="px-2 py-1 cursor-pointer bg-gray-400 hover:bg-sky-500 border" onclick={()=>{commandMonitor.execute(command_deleteChord(appState.arr, chord_index))}}>-Chord</button>
						<button id="+chord" class="px-2 py-1 cursor-pointer bg-gray-400 hover:bg-sky-500 border" onclick={()=>{commandMonitor.execute(command_addChord(appState.arr, chord_index))}}>+Chord</button>
					</div>
				
					{#if chord.length === 0}
						<button class="px-3 py-1 bg-white border cursor-pointer italic hover:bg-sky-500" onclick={()=>{chord.splice(1, 0, "")}}>add a note</button>
					{/if}  
				
					{#each chord as note, note_index}
						<div id="note-column" class="flex items-center gap-1 bg-gray-200 p-1 border border-gray-400">
							<input 
							bind:value={chord[note_index]} 
							placeholder="Note" 
							class="field-sizing-content min-w-[6ch] border px-1 {!validateNote(chord[note_index], appState.validNotes) ? 'border-red-500 bg-red-100' : 'border-gray-300'}"
							title={!validateNote(chord[note_index], appState.validNotes) 
								? `Invalid input. Please enter a valid note:${appState.validNotes}.` 
								: "Enter a musical note"}
							/>
							<button class="px-1 bg-gray-400 cursor-pointer hover:bg-sky-500 border" onclick={()=>{commandMonitor.execute(command_addNote(appState.arr[chord_index], note_index))}}>+</button>
							<button class="px-1 bg-gray-400 cursor-pointer hover:bg-sky-500 border" onclick={()=>{commandMonitor.execute(command_deleteNote(appState.arr[chord_index], note_index))}}>-</button>
						</div>
					{/each}
				</div>
			{/each}
			<pre>Arr{JSON.stringify(appState.arr, null, 2)}</pre>
			<pre>Tuning{JSON.stringify(appState.tuning, null, 2)}</pre>
		</div>
		<div id="output-section" class="w-1/2 p-4 bg-green-100 border-r overflow-y-auto">
			<!-- <pre> undo Stack: {JSON.stringify(commandMonitor.undoStack, null, 2)}</pre>
			<pre> redo Stack: {JSON.stringify(commandMonitor.redoStack, null, 2)}</pre> -->
			<pre> best frets: {JSON.stringify(appState.bestFret, null, 2)}</pre>

		</div>
	</div>
</div>

<KeydownManager></KeydownManager>
