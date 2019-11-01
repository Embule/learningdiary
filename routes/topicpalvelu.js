const Pool = require('pg').Pool;

const conopts = {
  user: 'postgres',
  password: 'nakertaja1',
  host: 'localhost',
  database: 'learningdiary'
}

const pool = new Pool(conopts);

pool.connect((err, client) => {
  if (err) throw err;
   console.log("Yhdistäminen onnistui");
})

function getAllTopics(callback) {
  pool.connect((err, client) => {
      if (err) throw err;
      client.query('SELECT * FROM topic', (err, data) => {
              if (err) throw err;
              client.release();
              callback(data.rows);
          });
  });
}

function addTopic(req, callback) {
  pool.connect((err, client) => {
    if (err) throw err;
    client.query('insert into topic(title, description, timetomaster, timespent, source, startdate, progress) values($1, $2, $3, $4, $5, $6, $7',
    [req.body.title, req.body.description, req.body.timetomaster, req.body.timespent, req.body.source, req.body.startdate, req.body.progress], (err, data) => {
      if (err) throw err;
      client.release();
      callback();
    });
  });
}

module.exports = { getAllTopics, addTopic}