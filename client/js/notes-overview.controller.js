import noteService from './rest-notes.service.js';
import HandlebarsTemplate from './handlebars-template.class.js';
import {_, $} from './lib.js';

export default class NoteOverviewController {
  constructor() {
    this.overviewTemplate = new HandlebarsTemplate("notes-overview");
    this.sortTemplate = new HandlebarsTemplate("notes-sort-form");

    this.sortTypes = [{
      id: 'sort-by-importance',
      name: "By importance",
      sortFunction: _notes => _notes.orderBy("importance", "desc").value(),
      selected: true
    }, {
      id: 'sort-by-finish-date',
      name: "By finish date",
      sortFunction: _notes => _notes.orderBy("finishDate").value(),
      selected: false
    }, {
      id: 'sort-by-create-date',
      name: "By creation date",
      sortFunction: _notes => _notes.orderBy("creationDate", "desc").value(),
      selected: false
    }];

    this.showFinished = true;

    this.$body = $("body");

    this.$styleSelector = $("#style-selector");
    this.$styleSelector.on("change", () => this.styleSelectorChanged());

    document.getElementById("create-note").addEventListener("click", () => this.createNoteButtonPressed());

    this.$notesSortForm = $("#notes-sort-form");
    this.$notesSortForm.on("click", "input", () => this.sortButtonPressed());

    document.getElementById("show-finished").addEventListener("change", event => this.showFinishedCheckboxPressed(event));

    this.$overviewContainer = $('#' + "overview-container");
    this.$overviewContainer.on("click", "button[name='edit-button']", event => this.editButtonPressed(event));
    this.$overviewContainer.on("click", "input[name='finish-checkbox']", event => this.editFinishedCheckboxPressed(event));
  }

  setRoutes(routes) {
    this.routes = routes;
  }

  createNoteButtonPressed() {
    this.routes.showDetailView();
  }

  styleSelectorChanged() {
    this.$body.removeClass();
    this.$body.addClass(this.$styleSelector[0].value);
  }

  sortButtonPressed() {
    let idToFind = this.$notesSortForm.find("input:checked")[0].id;
    this.sortTypes.forEach(sortType => sortType.selected = false);
    _.find(this.sortTypes, sortType => sortType.id === idToFind).selected = true;
    this.renderNotes();
  }

  showFinishedCheckboxPressed(event) {
    this.showFinished = event.target.checked;
    this.renderNotes();
  }

  editButtonPressed(event) {
    let noteId = this.getNoteIdForEvent(event);
    this.routes.showDetailView(noteId);
  }

  editFinishedCheckboxPressed(event) {
    let noteId = this.getNoteIdForEvent(event);
    let finished = event.target.checked;
    noteService.setFinished(noteId, finished)
      .then(() => this.renderNotes());
  }

  getNoteIdForEvent(event) {
    return $(event.target).closest("[data-note-id]")[0].dataset.noteId;
  }

  getSortedNotes() {
    return noteService.getNotes().then(notes => {
      let _notes = _(notes);
      if (!this.showFinished) {
        _notes = _notes.filter(note => !note.finishDate);
      }
      return _.find(this.sortTypes, "selected").sortFunction(_notes);
    });
  }

  show() {
    this.sortTemplate.render("notes-sort-form", {sortTypes: this.sortTypes});
    this.renderNotes();
  }

  renderNotes() {
    this.getSortedNotes().then(notes => this.overviewTemplate.render(this.$overviewContainer[0], {notes: notes}));
  }
}