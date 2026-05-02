import { Command_Template } from "./commandMonitor.svelte";

class Command_addChord extends Command_Template {
    constructor(chords_obj, chord_index) {
        super()
        this.chords_obj = chords_obj; // this is the specific 
        this.chord_index = chord_index;
        this.chord_values 
    }   
 
    execute() {
        if ( this.chords_obj.length === 0) {
            this.chords_obj.splice(this.chord_index, 0, this.chord_values || [""])
        }
        else {
            this.chords_obj.splice(this.chord_index + 1, 0, this.chord_values || [""])
        }
    }
    undo() {
        if (this.chords_obj.length === 1) {
            this.chord_values = this.chords_obj[this.chord_index]
            this.chords_obj.splice(this.chord_index, 1)
        }
        else {
            this.chord_values = this.chords_obj[this.chord_index + 1]
            this.chords_obj.splice(this.chord_index + 1, 1)
        }
    }

}

export const command_addChord = (chords_obj, chords_index) => new Command_addChord(chords_obj, chords_index)