import {$, moment} from './lib.js';

const DATE_FORMAT = "YYYY-MM-DD";

export default class Note {

  constructor(noteObject) {
    this.id = noteObject.id;
    this.title = noteObject.title;
    this.description = noteObject.description;
    this.importance = noteObject.importance;
    this.dueDate = noteObject.dueDate || Note.parseDate(noteObject.dueDateFormatted);
    this.finishDate = noteObject.finishDate || Note.parseDate(noteObject.finishDateFormatted);
    this.creationDate = noteObject.creationDate || Note.parseDate(noteObject.creationDateFormatted);
  }

  static createNewNote() {
    return new Note({creationDate: new Date()});
  }

  copyToObject(noteObj = {}) {
    $.extend(noteObj, this);
    delete noteObj.dueDate;
    delete noteObj.finishDate;
    delete noteObj.creationDate;

    return noteObj;
  }

  // get dueDate() {
  //   return this._dueDate;
  // }
  //
  // set dueDate(value) {
  //   this._dueDate = value;
  // }

  get dueDateFormatted() {
    return Note.formatDate(this.dueDate);
  }

  get finishDateFormatted() {
    return Note.formatDate(this.finishDate);
  }

  get creationDateFormatted() {
    return Note.formatDate(this.creationDate);
  }

  // TODO: Move to helper class?
  static formatDate(date) {
    return date ? moment(date).format(DATE_FORMAT) : null;
  }

  static parseDate(dateString) {
    return dateString ? moment(dateString, DATE_FORMAT) : null;
  }
}