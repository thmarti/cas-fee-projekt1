class LocalNotesService {
  constructor() {
    this.key = "notes";
    this.notes = [];

//    if (!this.notes) {
//      window.localStorage.setItem(this.key, this.notes);
//    }
  }

  getNotes() {
    return Promise.resolve(this.notes);
  }

  getNote(id) {
    return Promise.resolve(this.notes.find((note) => note.id === id));
  }

  createNote() {
    return Promise.resolve({creationDate: new Date()});
  }

  saveNewNote(note) {
    this.notes.push(note);
    return this.getNotes();
  }

  editNote(note) {
    let storageNote = this.notes.find((n) => n.id === note.id);
    if (storageNote) {
      storageNote.title = note.title;
      storageNote.description = note.description;
    }

    return this.getNotes();
  }

  deleteNode(note) {
    let i = this.notes.findIndex((n) => n.id === note.id);
    if (i >= 0) {
      this.notes.splice(i);
    }

    return this.getNotes();
  }
}

export default new LocalNotesService();