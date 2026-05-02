class CommandMonitor {
    undoStack = $state([])
    redoStack = $state([])
    canUndo = $derived(this.undoStack.length > 0);
	canRedo = $derived(this.redoStack.length > 0);
    
    execute(command) {
		command.execute(); 
		this.undoStack.push(command);
		this.redoStack = [];

		if (this.undoStack.length > 50) this.undoStack.shift();
    }
    undo() {
		const cmd = this.undoStack.pop();
		if (cmd) {
			cmd.undo();
			this.redoStack.push(cmd);
		}
		return "undo"
	}
	redo() {
		const cmd = this.redoStack.pop();
		if (cmd) {
			cmd.execute();
			this.undoStack.push(cmd);
		}
		return "redo"
	}
}

export class Command_Template {
  execute() { throw new Error("Execute must be implemented"); }
  undo() { throw new Error("Undo must be implemented"); }
}

export const commandMonitor = new CommandMonitor();

window.undo = commandMonitor.undo.bind(commandMonitor);
window.redo = commandMonitor.redo.bind(commandMonitor);