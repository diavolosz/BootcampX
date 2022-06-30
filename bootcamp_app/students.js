const { Pool } = require('pg');


//setting up the configruation data for database connection 
const config = {
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
}


//make pool a constant using the config data. making a new pool of client 
const pool = new Pool(config);


let cohortName = `${process.argv[2]}%`;
let limit = process.argv[3];

pool.query(`
SELECT students.id as id, students.name as name, cohorts.name as cohort_name
FROM students
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE $1
LIMIT ${'$2' || 5};
`, [cohortName, limit])
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_name} cohort`)
  })
  pool.end()
})
.catch(err => console.error('query error', err.stack));