const notesService = require("./notes-store.service.js");

class NotesController {

  // GET
  //noinspection JSUnusedLocalSymbols
  index(req, res) {
    return notesService.getAll()
      .then(notes => NotesController.renderJson(res, notes));
  }

  // GET
  show(req, res) {
    return notesService.get(req.params.id)
      .then(note => NotesController.renderJson(res, note));
  }

  // POST
  save(req, res) {
    return notesService.add(req.body).then(() => NotesController.renderJson(res, "OK"));
  }

  // PUT
  edit(req, res) {
    return notesService.edit(req.params.id, req.body).then(() => NotesController.renderJson(res, "OK"));
  }

  static renderJson(res, values) {
    res.type("aplication/json");
    res.end(JSON.stringify(values));
  }
}

module.exports = new NotesController();
