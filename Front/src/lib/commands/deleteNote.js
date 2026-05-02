import { Command_Template } from "./commandMonitor.svelte";

class Command_deleteNote extends Command_Template {
    constructor(chord_obj, note_index) {
        super()
        this.chord_obj = chord_obj; // this is the specific 
        this.note_index = note_index;
        this.note_value = chord_obj[note_index]
    }   
 
    execute() {
        this.chord_obj.splice(this.note_index, 1)
    }
	undo() {
		this.chord_obj.splice(this.note_index, 0, this.note_value)
	}

}

export const command_deleteNote = (chord_obj, note_index) => new Command_deleteNote(chord_obj, note_index)