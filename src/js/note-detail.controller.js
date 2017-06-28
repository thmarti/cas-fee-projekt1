import LocalNotesService from './local-notes.service.js';
import HandlebarsTemplate from './handlebars-template.js';


export default class NoteDetailController {
  constructor(routes) {
    this.routes = routes;
    this.noteService = new LocalNotesService();

    this.detailTemplate = new HandlebarsTemplate("edit-note");

    document.getElementById("save-detail");

    //id = "save-detail"
    //id = "cancel-detail"
  }

  show(id) {
    this.noteService.getNote(id).then((note) => {
      this.note = note;
      this.detailTemplate.render("detail-container", this.note);
      NoteDetailController.displayContainer(true);
    });
  }

  hide() {
    NoteDetailController.displayContainer(false);
    this.note = null;
  }

  static displayContainer(show) {
    // TODO: continue
    let classList = document.getElementById("detail-container").classList;
    classList.remove("", "");
    classList.add("s");
  }
}