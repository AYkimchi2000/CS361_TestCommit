import { Command_Template } from "./commandMonitor.svelte";

class Command_deleteChord extends Command_Template {
	constructor(chords_obj, chord_index) {
		super()
        this.chords_obj = chords_obj;
        this.chord_index = chord_index;
        this.chord_values = chords_obj[chord_index]
	}
 
    execute() {
        this.chords_obj.splice(this.chord_index, 1)
    }
	undo() {
		this.chords_obj.splice(this.chord_index, 0, this.chord_values)
	}

}

export const command_deleteChord = (chords_obj, chords_index) => new Command_deleteChord(chords_obj, chords_index)