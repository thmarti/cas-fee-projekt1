import Note from './note.class.js';

class LocalNotesService {
  constructor() {
    this.key = "notes";
    this.notes = [];

//    if (!this.notes) {
//      window.localStorage.setItem(this.key, this.notes);
//    }
  }

  getNotes() {
    return Promise.resolve(this.notes.map(n => new Note(n)));
  }

  getNote(id) {
    let noteObj = this.notes.find((note) => note.id === id);
    return Promise.resolve(noteObj ? new Note(noteObj) : null);
  }

  createNote() {
    return Promise.resolve(Note.createNote());
  }

  saveNewNote(note) {
    this.notes.push(note.copyToObject());
  }

  editNote(note) {
    let storageNote = this.notes.find((n) => n.id === note.id);
    if (storageNote) {
      note.copyToObject(storageNote);
    }
  }

  deleteNode(note) {
    let i = this.notes.findIndex((n) => n.id === note.id);
    if (i >= 0) {
      this.notes.splice(i);
    }
  }
}

export default new LocalNotesService();