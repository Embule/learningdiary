const Pool = require('pg').Pool;

// const conopts = {
//   user: 'postgres',
//   password: 'nakertaja1',
//   host: 'localhost',
//   database: 'learningdiary'
// }

const conopts = {
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  port: process.env.RDS_SERVER_PORT
}

const pool = new Pool(conopts);

pool.connect((err, client) => {
  if (err) throw err;
   console.log("Yhdistäminen onnistui");
})

function getAllTopics(callback) {
  pool.connect((err, client) => {
      if (err) throw err;
      client.query('SELECT * FROM topics', (err, data) => {
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

function getSingleTopic(req, callback) {
  pool.connect((err, client) => {
    if (err) throw  err;
    client.query('select * from topics where id = $1', [req.params.id], (err, data) => {
      if (err) throw err;
      client.release();
      callback(data.rows);
    });
  });
}
function removeTopic(req, res, callback) {
  pool.connect((err, client) => {
    if (err) throw err;
    client.query('delete from topics where id = $1',
    [parseInt(req.params.id)], (err, data) => {
      if (err) throw err;
      client.release();
      res.status(200).json({
        status: 'Onnistui', message: 'Topic poistettu'
      });
      callback();
    });
  });
}

function updateTopic(req, callback) {
  pool.connect((err, client) => {
    if (err) throw err;
    client.query('update topics set title = $1, description = $2, timetomaster = $3, timespent = $4, source = $5, startdate = $6, progress = $7 where id = $8', 
    [req.body.title, req.body.description, req.body.timetomaster, req.body.timespent, req.body.source, req.body.startdate, req.body.progress], (err, data) => {
      if (err) throw err;
      client.release();
      callback;
    });
  });
}

//vaihda topicsit topiceiksi jos ei toimi!

module.exports = { getAllTopics, addTopic, getSingleTopic, removeTopic, updateTopic}