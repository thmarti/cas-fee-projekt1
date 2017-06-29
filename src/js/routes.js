import NotesOverviewController from './notes-overview.controller.js';
import NoteDetailController from './note-detail.controller.js';

export default class Routes {
  constructor(notesOverviewController, noteDetailController) {
    this.notesOverviewController = notesOverviewController;
    this.noteDetailController = noteDetailController;
  }

  showOverview() {
    this.notesOverviewController.renderNotes();
  }

  showDetailView(id) {
    this.noteDetailController.show(id);
  }

}
