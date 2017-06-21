import NotesOverviewController from './notes-overview.controller.js';

let ctrl = new NotesOverviewController();
console.log(ctrl.getNotes());
console.log(ctrl.doSomething());



// (async () => {
//     let notes = await ctrl.getNotes();
//     console.log(notes);
// })();
