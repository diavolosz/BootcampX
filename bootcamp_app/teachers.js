const { Pool } = require('pg');


//setting up the configruation data for database connection 
const config = {
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
}


//make pool a constant using the config data. making a new pool of client cd ..
const pool = new Pool(config);


let cohortName = process.argv[2];

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort 
  FROM assistance_requests
  JOIN teachers ON assistance_requests.teacher_id = teachers.id 
  JOIN students ON assistance_requests.student_id = students.id
  JOIN cohorts ON cohorts.id = students.cohort_id
  WHERE cohorts.name = $1
  ORDER BY teachers.name;
`, [cohortName])
.then(res => {
  console.log(res.rows)
  res.rows.forEach(user => {
    console.log(`${user.cohort}: ${user.teacher}`)
  })
  pool.end()
})
.catch(err => console.error('query error', err.stack));