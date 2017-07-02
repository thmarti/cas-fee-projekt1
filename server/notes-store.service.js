const Datastore = require('nedb-promise');

class NotesService {
  constructor() {
    this.db = Datastore({filename: './notes.db', autoload: true});
  }

  getAll() {
    return this.db.find({});
  }

  get(id) {
    return this.db.findOne({_id: id});
  }

  add(note) {
    return this.db.insert(note);
  }

  edit(id, note) {
    return this.db.update({_id: id}, note);
  }
}

module.exports = new NotesService();