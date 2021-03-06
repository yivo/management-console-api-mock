if (typeof PhusionPassenger !== 'undefined') {
  PhusionPassenger.configure({autoInstall: false});
}

var express    = require('express');
var faker      = require('faker');
var _          = require('lodash');
var bodyParser = require('body-parser')
var app        = express();

app.use(bodyParser.json());

app.get('/clients/:id/buttons', function(req, res) {
  requireAccessKey(req, res, function() {
    requireAvailableClient(req, res, function() {
      requireNotBannedClient(req, res, function() {
        res.json({
          title:   randomConsoleTitle(),
          buttons: randomConsoleButtons()
        });
      });
    });
  });
});

app.post('/clients/:id/events', function(req, res) {
  requireAccessKey(req, res, function() {
    requireAvailableClient(req, res, function() {
      requireNotBannedClient(req, res, function() {
        res.status(req.body.buttonID ? 201 : 422).send();
      });
    });
  });
});

if (typeof PhusionPassenger !== 'undefined') {
  app.listen('passenger');
} else {
  app.listen(3000);
}

var AVAILABLE_CLIENTS = [1, 2, 3];
var BANNED_CLIENTS    = [3];
var ACCESS_KEYS       = ['XXX', 'YYY', 'ZZZ'];

function requireAccessKey(req, res, next) {
  if (_.includes(ACCESS_KEYS, req.header('X-API-Key'))) {
    next();
  } else {
    res.status(401).send();
  }
}

function requireAvailableClient(req, res, next) {
  if (_.includes(AVAILABLE_CLIENTS, _.parseInt(req.params.id))) {
    next();
  } else {
    res.status(404).send();
  }
}

function requireNotBannedClient(req, res, next) {
  if (_.includes(BANNED_CLIENTS, _.parseInt(req.params.id))) {
    res.status(403).send();
  } else {
    next();
  }
}

function randomConsoleTitle() {
  return 'Client ' + faker.name.findName();
}

function randomConsoleButtons() {
  return _.map(_.times(_.random(0, 20)), function(i) {
    return {
      id:          i + 1,
      title:       faker.company.companyName(),
      description: faker.lorem.paragraph()
    };
  });
}
