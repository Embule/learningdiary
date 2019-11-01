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