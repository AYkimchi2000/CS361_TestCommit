import re

def clean_octave(chords):
    # JS .map mirrors Python list comprehension
    return [[re.sub(r'\d+', '', note) for note in chord] for chord in chords]

def array_unique(array):
    # To match JS behavior exactly, we must flatten and preserve order
    # JS: [...new Set(array.flat())]
    flat_list = [item for sublist in array for item in sublist]
    seen = set()
    return [x for x in flat_list if not (x in seen or seen.add(x))]

def calc_best_frets(unique_array, fretboard_array):
    matches = []
    for index, fret_array in enumerate(fretboard_array):
        # JS equivalent: uniqueArray.filter(note => fretArray.includes(note)).length
        # This ensures we count based on the unique_array, not the fretboard contents
        count = sum(1 for note in unique_array if note in fret_array)
        matches.append({"fret": index, "score": count})

    # Grouping logic
    grouped = {}
    for m in matches:
        if m["score"] > 0:
            score = m["score"]
            if score not in grouped:
                grouped[score] = []
            grouped[score].append(m["fret"])

    # JS Object.entries(...).map(...).sort(...)
    result = [
        {"score": int(score), "frets": frets} 
        for score, frets in grouped.items()
    ]
    
    # Sort descending by score
    return sorted(result, key=lambda x: x["score"], reverse=True)
fretboard = [
    ["E", "A", "D", "G", "B", "E"],           # 0
    ["F", "A#/Bb", "D#/Eb", "G#/Ab", "C", "F"], # 1
    ["F#/Gb", "B", "E", "A", "C#/Db", "F#/Gb"], # 2
    ["G", "C", "F", "A#/Bb", "D", "G"],       # 3
    ["G#/Ab", "C#/Db", "F#/Gb", "B", "D#/Eb", "G#/Ab"], # 4
    ["A", "D", "G", "C", "E", "A"],           # 5
    ["A#/Bb", "D#/Eb", "G#/Ab", "C#/Db", "F", "A#/Bb"], # 6
    ["B", "E", "A", "D", "F#/Gb", "B"],       # 7
    ["C", "F", "A#/Bb", "D#/Eb", "G", "C"],   # 8
    ["C#/Db", "F#/Gb", "B", "E", "G#/Ab", "C#/Db"], # 9
    ["D", "G", "C", "F", "A", "D"],           # 10
    ["D#/Eb", "G#/Ab", "C#/Db", "F#/Gb", "A#/Bb", "D#/Eb"], # 11
    ["E", "A", "D", "G", "B", "E"]            # 12
]