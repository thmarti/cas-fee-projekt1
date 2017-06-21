import PouchDB from "https://unpkg.com/pouchdb@6.2.0";
import * as _ from 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js';


export default class NotesPouchDBService {
    constructor() {
        this.db = new PouchDB('notes');
    }

    getNotes() {
        return this.db.allDocs({include_docs: true, descending: true})
            .then((doc) => _.map(doc.rows, "doc"));
    }

    createNote(note) {
        this.db.post(note)
            .then(() => this.getNotes());
    }

    editNote(note) {
        this.db.put(note)
            .then(() => this.getNotes());
    }

    deleteNode(note) {
        this.db.remove(note)
            .then(() => this.getNotes());
    }
}
