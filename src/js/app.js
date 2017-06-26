import NotesOverviewController from './notes-overview.controller.js';

let ctrl = new NotesOverviewController();
ctrl.renderNotes();

//ctrl.getSortedNotes().then(window.console.log);
//ctrl.doSomething().then(window.console.log);


// (async () => {
//     let notes = await ctrl.getSortedNotes();
//     console.log(JSON.stringify(notes));
// })();
