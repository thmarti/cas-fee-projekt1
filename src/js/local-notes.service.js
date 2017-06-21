export default class LocalNotesService {
    constructor() {
        let key = "notes";
        this.notes = window.localStorage.getItem(key);

        if (!this.notes) {
            this.notes = [];
            window.localStorage.setItem(key, this.notes);
        }
    }

    getNotes() {
        return this.notes;
    }

    createNote(note) {
        this.notes.push(note);
        return this.notes;
    }

    editNote(note) {
        let storageNote = this.notes.find((n) => n.id === note.id);
        if (storageNote) {
            storageNote.title = note.title;
            storageNote.description = note.description;
        }

        return this.notes;
    }

    deleteNode(note) {
        let i = this.notes.findIndex((n) => n.id === note.id);
        if (i >= 0) {
            this.notes.splice(i);
        }

        return this.notes;
    }

}