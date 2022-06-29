const { Pool } = require('pg');

const config = {
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx',
  port: 5432
}

const pool = new Pool(config);

pool.connect()




