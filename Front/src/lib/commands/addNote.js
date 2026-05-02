import { Command_Template } from "./commandMonitor.svelte";

class Command_addNote extends Command_Template {
    constructor(chord_obj, note_index) {
        super()
        this.chord_obj = chord_obj; // this is the specific 
        this.note_index = note_index;
        this.note_value
    }   
 
    execute() {
        if ( this.chord_obj.length === 0) {
            this.chord_obj.splice(this.note_index, 0, this.note_value || "")
        }
        else {
            this.chord_obj.splice(this.note_index + 1, 0, this.note_value || "")
        }
    }
    undo() {
        if (this.chord_obj.length === 1) {
            this.note_value = this.chord_obj[this.note_index]
            this.chord_obj.splice(this.note_index, 1)
        }
        else {
            this.note_value = this.chord_obj[this.note_index + 1]
            this.chord_obj.splice(this.note_index + 1, 1)
        }
    }

}

export const command_addNote = (chord_obj, note_index) => new Command_addNote(chord_obj, note_index)