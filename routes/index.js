var express = require('express');
var router = express.Router();

var palvelu = require('./topicpalvelu');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/topics', function (req, res) {
  palvelu.getAllTopics(function (data) {
    res.json(data)
  });
});

router.post('api/topics', function (req, res) {
  palvelu.addTopic(req, function () {
    res.status(201).end();
  });
});

module.exports = router;
