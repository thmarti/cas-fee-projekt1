import DummyService from "./dummy.service.js";

// let noteService = new NotesPouchDBService();
// noteService.getNotes().then((notes) => console.log(notes));

let dummyService = new DummyService();
console.log(dummyService.getValue());