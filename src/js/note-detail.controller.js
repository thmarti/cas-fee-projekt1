import noteService from './local-notes.service.js';
import HandlebarsTemplate from './handlebars-template.class.js';
import {$, moment} from './lib.js';

export default class NoteDetailController {
  constructor() {
    this.detailTemplate = new HandlebarsTemplate("edit-note");

    let $detailContainer = $("#detail-container");
    $detailContainer.on("click", "#save-detail", () => this.saveAndClose());
    $detailContainer.on("click", "#cancel-detail", () => this.close());
  }

  setRoutes(routes) {
    this.routes = routes;
  }

  show(id) {
    let action = (id ? noteService.getNote(id) : noteService.createNote());
    action.then((note) => {
      this.note = note;
      this.detailTemplate.render("detail-container", this.note);
      NoteDetailController.displayContainer(true);
    });
  }

  saveAndClose() {
    // TODO: Map note
    this.note.title = $("input[name='note-title']")[0].value;
    this.note.description = $("textarea[name='note-description']")[0].value;
    this.note.importance = parseInt($("input[name='note-importance']:checked")[0].dataset.importance);
    let dateString = $("input[name='note-duedate']")[0].value;
    this.note.dueDate = moment(dateString, "yyyy-MM-dd") ;

    let action = (this.note.id ? noteService.editNote(this.note) : noteService.saveNewNote(this.note));
    action.then(() => {
      this.close();
      this.routes.showOverview();
    });
  }

  close() {
    NoteDetailController.displayContainer(false);
    this.note = null;
  }

  static displayContainer(show) {
    let classList = document.getElementById("modal-container").classList;
    classList.remove("hide");
    if (!show) {
      classList.add("hide");
    }
  }
}