import LocalNotesService from './local-notes.service.js';

export default class NoteOverviewController {
    constructor() {
        this.noteService = new LocalNotesService();
        this.noteService.createNote({
            id: 1,
            title: "Dies mein Titel",
            description: "Mein schöne Beschreibung",
            creationDate: new Date()
        });
        this.noteService.createNote({
            id: 2,
            title: "Dies mein zweiterTitel",
            description: "foobar",
            creationDate: new Date()
        });
        this.noteService.createNote({
            id: 3,
            title: "Jeppa",
            description: "blubb",
            creationDate: new Date()
        });
    }

    getNotes() {
        return this.noteService.getNotes();
    }

    doSomething() {
        return this.noteService.deleteNode(this.getNotes()[2]);
    }

    // async getNotes() {
    //     let notes = await this.noteService.getNotes();
    //     return notes;
    // }
}