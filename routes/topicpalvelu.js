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

module.exports = { getAllTopics}