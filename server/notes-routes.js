const express = require('express');
const router = express.Router();
const notes = require('./notes.controller.js');

// use Grails naming to map HTTP verbs to methods
router.get("/notes", notes.index);
router.get("/notes/:id/", notes.show);
router.post("/notes", notes.save);
router.put("/notes/:id/", notes.edit);

module.exports = router;