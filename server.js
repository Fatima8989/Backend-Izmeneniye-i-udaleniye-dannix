const express = require('express');
const app = express();
const fs = require('fs');

fs.readFile('./danniye.json', 'utf8', (err, data) => {
  if (!err) {
    console.log(data);
  } else {
    console.error(err);
  }
  let s = JSON.parse(data);
  const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Operation4589',
  database: 'archive12'
});

connection.connect((err) => {
  if (!err) { 
    console.log("SUCCESS");
  }
});
console.log(s[0].description)
  connection.query(`
  INSERT INTO employee12 (Task_description, due, Employee, Finished_date)
  VALUES ('${s[0].description}', '${s[0].due}', '${s[0].employee}', '${s[0].finished}'),
  ('${s[1].description}', '${s[1].due}', '${s[1].employee}', '${s[1].finished}'),
  ('${s[2].description}', '${s[2].due}', '${s[2].employee}', '${s[2].finished}'),
  ('${s[3].description}', '${s[3].due}', '${s[3].employee}', '${s[3].finished}'),
  ('${s[4].description}', '${s[4].due}', '${s[4].employee}', '${s[4].finished}'),
  ('${s[5].description}', '${s[5].due}', '${s[5].employee}', '${s[5].finished}'),
  ('${s[6].description}', '${s[6].due}', '${s[6].employee}', '${s[6].finished}');
`, 
(err, data) => {
  if (!err) {
    console.log(data);
  }
  else console.log(err)
});

connection.query('UPDATE employee12 SET due = CURRENT_TIMESTAMP() WHERE due IS NULL;', (err, data) => {
  if (!err) {
    console.log(data);
  }
  else console.log(err)
});
connection.query('UPDATE employee12 SET Employee = "John" WHERE Employee IS NULL;', (err, data) => {
  if (!err) {
    console.log(data);
  }
  else console.log(err)
});
connection.query('UPDATE employee12 SET due = Finished_date WHERE Employee = "John";', (err, data) => {
  if (!err) {
    console.log(data);
  }
  else console.log(err)
});
// connection.query("DELETE FROM employee12 WHERE due < Finished_data;", (err, data) => {
//   if (!err) {
//     console.log(data);
//   }
//   else console.log(err)
// });
app.get('/task', (req, res) => {
  connection.query('SELECT * FROM employee12 ;', 
  (err, data) => {
    if (err) return res.status(500);
    res.json(data);
  })
});

app.get('/task/:id',(req, res)=> {
    connection.query(`SELECT FROM employee12  WHERE id = ${req.params.id};`,
    (err, data) => {
      if (err) return res.status(500);
      res.json(data);
    })
  }); 
});

  app.listen(3001, () =>
  console.log('App listening at port 3001')
  )