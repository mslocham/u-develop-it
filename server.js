const express = require('express');
const inputCheck = require('./utils/inputCheck');
const db = require('./db/connection');
/* We don't have to specify index.js in the path (e.g., ./routes/apiRoutes/index.js).
 If the directory has an index.js file in it, Node.js will automatically look
 for it when requiring the directory. */
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

/*
// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
              VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});
*/
/*
// Delete a candidate
db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});
*/

/*
// GET a single candidate
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
  if (err) {
    console.log(err);
  }
  console.log(row);
});
*/
// Default response for any other request (Not Found)
/* Because this is a catchall route, its placement is very important. What happens to 
the GET test route if we place this route above it?
This route will override all others—so make sure that this is the last one. */
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});