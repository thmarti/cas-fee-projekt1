import NotesOverviewController from './notes-overview.controller.js';
import NoteDetailController from './note-detail.controller.js';

export default class Routes {
  constructor() {
    this.notesOverviewController = new NotesOverviewController(this);
    this.noteDetailController = new NoteDetailController(this);

    this.notesOverviewController.show();
  }

  showOverview() {
    NoteDetailController.hide();
    this.notesOverviewController.renderNotes();
  }

  showDetailView(id) {
    this.noteDetailController.show(id);
  }

}
