import './handelbars.helpers.js';
import Routes from './routes.js';
import NotesOverviewController from './notes-overview.controller.js';
import NoteDetailController from './note-detail.controller.js';

let notesOverviewController = new NotesOverviewController();
let noteDetailController = new NoteDetailController();

let routes = new Routes(notesOverviewController, noteDetailController);
notesOverviewController.setRoutes(routes);
noteDetailController.setRoutes(routes);

notesOverviewController.show();

