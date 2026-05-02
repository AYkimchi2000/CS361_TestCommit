import { arrayUnique } from "./util"
import { calcBestFrets } from "./util"
import { fretboard } from "./util"
import { generateValidNoteRange } from "./util"

class AppState {
    nav = $state({
        currentView : ""
    })
    arr = $state([
        
    ])
    tuning = $state(["E2", "A2", "D3", "G3", "B3", "E4"])
    fretCount = $state(22)
    bestFret = $derived(calcBestFrets(arrayUnique(this.arr), fretboard))
    validNotes = $derived(generateValidNoteRange(this.tuning, this.fretCount))
}



export const appState = new AppState()
