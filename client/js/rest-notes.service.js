import Note from './note.class.js';

class RemoteNotesService {

  getNotes() {
    return fetch("/notes")
      .then(response => response.json())
      .then(notes => notes.map((n) => new Note(n)))
      ;
  }

  getNote(id) {
    return fetch(`/notes/${id}`)
      .then(response => response.json())
      .then(note => new Note(note))
      ;
  }

  createNote() {
    return Promise.resolve(Note.createNewNote());
  }

  saveNote(note) {
    let noteObj = note.copyToObject();
    if (note.id) {
      return this.sendRequest("PUT", "/notes/" + note.id, noteObj);
    } else {
      return this.sendRequest("POST", "/notes", noteObj);
    }
  }

  setFinished(id, finished) {
    return this.getNote(id)
      .then(note => note.setFinished(finished))
      .then(note => this.saveNote(note))
      ;
  }

  sendRequest(method, path, body) {
    return fetch(path, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: method,
      body: body ? JSON.stringify(body) : undefined
    });
  }
}

export default new RemoteNotesService();