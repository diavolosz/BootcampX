SELECT assignments.day as day, COUNT(*) as total_assignments
  FROM assignments
  GROUP BY assignments.day 
  ORDER BY assignments.day;