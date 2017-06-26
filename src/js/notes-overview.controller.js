import LocalNotesService from './local-notes.service.js';
import HandlebarsTemplate from './handlebars-template.js';
import _ from './lodash.lib.js';
import moment from './moment.lib.js';

export default class NoteOverviewController {
    constructor() {
        this.noteService = new LocalNotesService();
        this.noteService.createNote({
            id: 1,
            title: "Dies mein Titel",
            description: "Mein schöne Beschreibung",
            importance: 3,
            finshed: false,
            finishDate: null,
            creationDate: new Date()
        });
        this.noteService.createNote({
            id: 2,
            title: "Dies mein zweiterTitel",
            description: "foobar",
            importance: 1,
            finished: false,
            finishDate: null,
            creationDate: new Date()
        });
        this.noteService.createNote({
            id: 3,
            title: "Jeppa",
            description: "blubb",
            importance: 5,
            finished: true,
            finishDate: moment("2017-06-25"),
            creationDate: new Date()
        });

        this.overviewTemplate = new HandlebarsTemplate("notes-overview");
        this.currentSort = "sort-by-importance";
        this.showFinished = false;


        this.createNoteButton = document.getElementById("create-note");
        this.createNoteButton.click((event) => {
            // TODO: Routing to detail view
            event.preventDefault();
        });

//        this.notesSortForm = document.getElementById("notes-sort-form");
        this.notesSortForm = window.$("#notes-sort-form");
        this.notesSortForm.on("click", "input", () => {
            let element = this.notesSortForm.find("input:checked");
            this.currentSort = element[0].id;
            this.renderNotes();
        });

        this.createNoteButton = document.getElementById("show-finished");
        this.createNoteButton.click((event) => {
            this.showFinished = !this.showFinished;
            this.renderNotes();
        });
    }

    getSortedNotes() {
        return this.noteService.getNotes().then((notes) => {
            let _notes = _(notes);
            if (!this.showFinished) {
                _notes = _notes.filter((note) => !note.finished);
            }
            switch (this.currentSort) {
                case "sort-by-importance":
                    return _notes.sortBy("importance").reverse().value();
                case "sort-by-finish-date":
                    return _notes.sortBy("finishDate").value();
                case "sort-by-create-date":
                    return _notes.sortBy("creationDate").value();
                default:
                    return notes;
            }
        });
    }

    renderNotes() {
        this.getSortedNotes().then((notes) => this.overviewTemplate.render("main-container", {notes: notes}));
    }
}