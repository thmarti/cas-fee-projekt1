import noteService from './local-notes.service.js';
import HandlebarsTemplate from './handlebars-template.js';
import {$} from './lib.js';

export default class NoteDetailController {
  constructor() {
    this.detailTemplate = new HandlebarsTemplate("edit-note");

    let detailContainer = $("#detail-container");
    detailContainer.on("click", "#save-detail", () => this.saveAndClose());
    detailContainer.on("click", "#cancel-detail", () => this.close());
  }

  setRoutes(routes) {
    this.routes = routes;
  }

  saveAndClose() {
    // TODO: Map note
    let note = {};

    let action = (this.note.id ? noteService.editNote(note) : this.noteService.createNote(note));
    action.then(() => {
      this.close();
      this.routes.showOverview();
    });
  }

  show(id) {
    noteService.getNote(id).then((note) => {
      this.note = note;
      this.detailTemplate.render("detail-container", this.note);
      NoteDetailController.displayContainer(true);
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