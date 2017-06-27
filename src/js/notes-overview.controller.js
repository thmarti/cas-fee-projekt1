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
            finishDate: null,
            creationDate: new Date()
        });
        this.noteService.createNote({
            id: 2,
            title: "Dies mein zweiterTitel",
            description: "foobar",
            importance: 1,
            finishDate: null,
            creationDate: new Date()
        });
        this.noteService.createNote({
            id: 3,
            title: "Jeppa",
            description: "blubb",
            importance: 5,
            finishDate: moment("2017-06-25"),
            creationDate: new Date()
        });

        this.overviewTemplate = new HandlebarsTemplate("notes-overview");
        this.sortTemplate = new HandlebarsTemplate("notes-sort-form");

        this.sortTypes = [{
            id: 'sort-by-importance',
            name: "By importance",
            sortFunction: (_notes) => _notes.sortBy("importance").reverse().value(),
            selected: true
        }, {
            id: 'sort-by-finish-date',
            name: "By finish date",
            sortFunction: (_notes) => _notes.sortBy("finishDate").value(),
            selected: false
        }, {
            id: 'sort-by-create-date',
            name: "By creation date",
            sortFunction: (_notes) => _notes.sortBy("creationDate").value(),
            selected: false
        }];

        this.showFinished = true;


        this.createNoteButton = document.getElementById("create-note");
        this.createNoteButton.click((event) => {
            // TODO: Routing to detail view
            event.preventDefault();
        });

//        this.notesSortForm = document.getElementById("notes-sort-form");
        this.notesSortForm = window.$("#notes-sort-form");
        this.notesSortForm.on("click", "input", () => {
            let element = this.notesSortForm.find("input:checked");
            this.sortTypes.forEach((type) => type.selected = false);
            _.find(this.sortTypes, (type) => type.id  === element[0].id).selected = true;
            this.renderNotes();
        });

        this.createNoteButton = document.getElementById("create-note");
        this.createNoteButton.click((event) => {
            this.showFinished = !this.showFinished;
            this.renderNotes();
        });

        this.showFinishedCheckbox = document.getElementById("show-finished");
        this.showFinishedCheckbox.addEventListener("change", () => {
            this.showFinished = this.showFinishedCheckbox.checked;
            this.renderNotes();
        });
    }

    getSortedNotes() {
        return this.noteService.getNotes().then((notes) => {
            let _notes = _(notes);
            if (!this.showFinished) {
                _notes = _notes.filter((note) => !note.finishDate);
            }
            return _.find(this.sortTypes, "selected").sortFunction(_notes);
        });
    }

    renderSort() {
        return this.sortTemplate.render("notes-sort-form", {sortTypes: this.sortTypes});
    }

    renderNotes() {
        this.getSortedNotes().then((notes) => this.overviewTemplate.render("main-container", {notes: notes}));
    }
}