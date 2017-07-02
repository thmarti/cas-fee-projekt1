(()=> {
  'use strict';

  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();

  app.use(bodyParser.json());
  app.use(require('./notes-routes.js'));
  app.use(express.static(__dirname + '/../client'));

  const hostname = '127.0.0.1';
  const port = 3001;
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

})();
