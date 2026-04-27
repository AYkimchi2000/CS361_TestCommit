import { page } from "$app/state";

export function updateRouteState (state) {
    state = page.route.id
}

export function validateNote (note) {
    const musicNotes = [ "C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#", "Ab", "A", "A#", "Bb", "B", "" ];
    return musicNotes.includes(note)
}


let fretboard = [
    ["E", "A", "D", "G", "B", "E"],           // 0 (Open)
    ["F", "A#/Bb", "D#/Eb", "G#/Ab", "C", "F"], // 1
    ["F#/Gb", "B", "E", "A", "C#/Db", "F#/Gb"], // 2
    ["G", "C", "F", "A#/Bb", "D", "G"],       // 3
    ["G#/Ab", "C#/Db", "F#/Gb", "B", "D#/Eb", "G#/Ab"], // 4
    ["A", "D", "G", "C", "E", "A"],           // 5
    ["A#/Bb", "D#/Eb", "G#/Ab", "C", "F", "A#/Bb"], // 6
    ["B", "E", "A", "D", "F#/Gb", "B"],       // 7
    ["C", "F", "A#/Bb", "D#/Eb", "G", "C"],   // 8
    ["C#/Db", "F#/Gb", "B", "E", "G#/Ab", "C#/Db"], // 9
    ["D", "G", "C", "F", "A", "D"],           // 10
    ["D#/Eb", "G#/Ab", "C#/Db", "F#/Gb", "A#/Bb", "D#/Eb"], // 11
    ["E", "A", "D", "G", "B", "E"]            // 12
];


