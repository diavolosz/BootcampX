SELECT id, name, email, cohort_id
  FROM students
  WHERE email NOT IN (SELECT email
                      FROM students
                      WHERE email LIKE '%gmail.com')
  AND phone IS NULL
  ORDER BY name
