const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'GURsumer@!1#$',
    database: 'election'
  },
  console.log('Connected to the election database.')
);

app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
});

db.query(`SELECT * FROM candidates`, (err, rows) => {
  console.log(rows);
});

// Default response for any other request (Not Found)
/* Because this is a catchall route, its placement is very important. What happens to 
the GET test route if we place this route above it?
This route will override all others—so make sure that this is the last one. */
app.use((req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });