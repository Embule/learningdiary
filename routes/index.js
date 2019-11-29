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

// {
//   "title": "CSS",
//   "description": "frontend visuals",
//   "timetomaster": 2,
//   "timespent": 1,
//   "source": "academy",
//   "startdate": "2019-09-01",
//   "progress": false
// }

router.get('/api/topics/:id', function (req, res) {
  palvelu.getSingleTopic(req, function (data) {
    res.json(data)
  });
});

router.delete('/api/topics/:id', function(req, res) {
  palvelu.removeTopic(req, res, function() {
    res.status(200)
  });
});

router.put('/api/topics/:id', function(req, res) {
  palvelu.updateTopic(req, function () {
    res.status(200)
    .end();
  });
});

module.exports = router;
