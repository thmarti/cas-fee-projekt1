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
