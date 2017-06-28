import NotesOverviewController from './notes-overview.controller.js';
import NoteDetailController from './note-detail.controller.js';

export default class Routes {
  constructor(notesOverviewController, noteDetailController) {
    this.notesOverviewController = notesOverviewController;
    this.noteDetailController = noteDetailController;
  }

  showOverview() {
    NoteDetailController.hide();
    this.notesOverviewController.renderNotes();
  }

  showDetailView(id) {
    this.noteDetailController.show(id);
  }

}
