import Note from './note.class.js';

/**
 * Use this service to only save in memory.
 */
class LocalNotesService {
  constructor() {
    this.notes = [];
    this._nextId = 1;
  }

  getNotes() {
    return Promise.resolve(this.notes.map(n => new Note(n)));
  }

  getNote(id) {
    let noteObj = this.notes.find(note => note.id === id);
    return Promise.resolve(noteObj ? new Note(noteObj) : null);
  }

  createNote() {
    return Promise.resolve(Note.createNewNote());
  }

  saveNote(note) {
    if (note.id) {
      let storageNote = this.notes.find(n => n.id === note.id);
      if (storageNote) {
        note.copyToObject(storageNote);
      }
    } else {
      note.id = this.getNextId();
      this.notes.push(note.copyToObject());
    }

    return Promise.resolve(null);
  }

  setFinished(id, finished) {
    return this.getNote(id)
      .then(note => note.setFinished(finished))
      .then(note => this.saveNote(note))
      ;
  }

  getNextId() {
    return this._nextId++;
  }
}

export default new LocalNotesService();