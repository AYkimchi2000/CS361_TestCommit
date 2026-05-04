import { page } from "$app/state";

export const fretboard = [
    ["E", "A", "D", "G", "B", "E"],           // 0 (Open)
    ["F", "A#/Bb", "D#/Eb", "G#/Ab", "C", "F"], // 1
    ["F#/Gb", "B", "E", "A", "C#/Db", "F#/Gb"], // 2
    ["G", "C", "F", "A#/Bb", "D", "G"],       // 3
    ["G#/Ab", "C#/Db", "F#/Gb", "B", "D#/Eb", "G#/Ab"], // 4
    ["A", "D", "G", "C", "E", "A"],           // 5
    ["A#/Bb", "D#/Eb", "G#/Ab", "C#/Db", "F", "A#/Bb"], // 6
    ["B", "E", "A", "D", "F#/Gb", "B"],       // 7
    ["C", "F", "A#/Bb", "D#/Eb", "G", "C"],   // 8
    ["C#/Db", "F#/Gb", "B", "E", "G#/Ab", "C#/Db"], // 9
    ["D", "G", "C", "F", "A", "D"],           // 10
    ["D#/Eb", "G#/Ab", "C#/Db", "F#/Gb", "A#/Bb", "D#/Eb"], // 11
    ["E", "A", "D", "G", "B", "E"]            // 12
];

export function updateRouteState (state) {
    state = page.route.id
}



export function generateValidNoteRange(tuning, fretCount = 22) {
    const noteNmidi = (note, mode) => {
        const notes = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 };
        
        // Define enharmonic pairs for the m2n conversion
        const NOTES_MAP = [
            ['C'], ['C#', 'Db'], ['D'], ['D#', 'Eb'], ['E'], ['F'], ['F#', 'Gb'], ['G'], ['G#', 'Ab'], ['A'], ['A#', 'Bb'], ['B']
        ];
        if (mode === "n2m") {
            const match = note.match(/^([A-G][#b]?)(-?\d+)$/i);
            if (!match) return null;
            const name = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
            const octave = parseInt(match[2]);   
            return (octave + 1) * 12 + notes[name]; 
        } 
        else if (mode === "m2n") {
            const midi = note;
            if (midi < 0 || midi > 127) return null;
            const names = NOTES_MAP[midi % 12];
            const octave = Math.floor(midi / 12) - 1;
            // Returns an array of strings: e.g., ["C#3", "Db3"]
            return names.map(n => `${n}${octave}`);
        } 
    };

    const generateRange = (x, y) => Array.from({ length: y + 1 }, (_, i) => x + i);
    const mergeUnique = (...arrays) => [...new Set(arrays.flat())].sort((a, b) => a - b);

    const tuning_midi = tuning.map(note => noteNmidi(note, "n2m"));
    const tuning_midi_range = tuning_midi.map(midiNote => generateRange(midiNote, fretCount));
    const merged_midi_ranges = mergeUnique(...tuning_midi_range);
    

    return ["", ...merged_midi_ranges.flatMap(note => noteNmidi(note, "m2n"))];
}
export function validateNote (note,validNotes) {
    return validNotes.includes(note)
}
export function cleanOctave (chords) {
    return chords.map(chord => chord.map( note => note.replace(/\d+/g, '')))
}
export function arrayUnique (array) {
    return [...new Set(array.flat())];
}
export function calcBestFrets(uniqueArray, fretboardArray) {
    const matches = fretboardArray.map((fretArray, index) => {
        const count = uniqueArray.filter(note => fretArray.includes(note)).length;
        return { fret: index, score: count };
    });

    const grouped = matches
        .filter(m => m.score > 0)
        .reduce((acc, curr) => {
            if (!acc[curr.score]) {
                acc[curr.score] = [];
            }
            acc[curr.score].push(curr.fret);
            return acc;
        }, {});
    return Object.entries(grouped)
        .map(([score, frets]) => ({ score: parseInt(score), frets }))
        .sort((a, b) => b.score - a.score);
}