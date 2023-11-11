const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Nidhhi@2409',
  database: 'task_1_db',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/api/students/:class', (req, res) => {
  const studentClass = req.params.class;
  const query = `SELECT * FROM students WHERE class = ? ORDER BY sort_rank`;

  db.query(query, [studentClass], (err, results) => {
    if (err) {
      console.error('Error fetching students: ' + err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(results);
  });
});

app.put('/api/updateSortRank', (req, res) => {
  const updates = req.body;

  updates.forEach((update) => {
    const query = 'UPDATE students SET sort_rank = ? WHERE class = ? AND name_of_student = ?';
    db.query(query, [update.sort_rank, update.class, update.name_of_student], (err) => {
      if (err) {
        console.error('Error updating sort rank: ' + err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
    });
  });

  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
