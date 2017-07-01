(()=> {
  'use strict';

  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();
  const router = express.Router();

  app.use(bodyParser.json());

//  app.use(require('./routes/orderRoutes.js'));
  app.use(express.static(__dirname + '/public'));



  router.get("/", (req, res) => {
    res.type("text/plain");
    res.end("Hello World!");
  });

  app.use(router);

  const hostname = '127.0.0.1';
  const port = 3001;
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

})();
