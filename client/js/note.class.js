import {$, moment} from './lib.js';

const DATE_FORMAT = "YYYY-MM-DD";

export default class Note {

  constructor(noteObject) {
    this.id = noteObject._id;
    this.title = noteObject.title;
    this.description = noteObject.description;
    this.importance = noteObject.importance;
    this.dueDate =  Note.parseISODate(noteObject.dueDate);
    this.finishDate = Note.parseISODate(noteObject.finishDate);
    this.creationDate = Note.parseISODate(noteObject.creationDate);
  }

  static createNewNote() {
    return new Note({creationDate: new Date(), importance: 3});
  }

  copyToObject(noteObj = {}) {
    $.extend(noteObj, this);
    delete noteObj.id;
    noteObj._id = this.id;
    noteObj.dueDate = Note.formatISODate(this.dueDate);
    noteObj.finishDate = Note.formatISODate(this.finishDate);
    noteObj.creationDate = Note.formatISODate(this.creationDate);

    return noteObj;
  }

  setFinished(finished) {
    this.finishDate = (finished ? new Date() : null);
    return this;
  }

  get dueDateFormatted() {
    return this.dueDate ? moment(this.dueDate).format(DATE_FORMAT) : null;
  }

  set dueDateFormatted(dueDateFormatted) {
    this.dueDate = dueDateFormatted ? moment(dueDateFormatted, DATE_FORMAT) : null;
  }

  static formatISODate(date) {
    return date ? date.toISOString() : null;
  }

  static parseISODate(date) {
    return date ? new Date(date) : null;
  }
}