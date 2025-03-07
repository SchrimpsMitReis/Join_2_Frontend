class Subtask {
    constructor(id = undefined, text, done = false) {
        this.id = id;
        this.text = text;
        this.done = done;
    }
    subTaskDone() {
        this.done = true;
    }
    subTaskUndone() {
        this.done = false;
    }
}