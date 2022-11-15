const cors = require('cors');
const express = require('express');
const mysql = require('mysql');
const pool = require('./database/db');

const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/*
app.get('/test', (req, res) => {
  const { table } = req.query;

  pool.query(`select * from ${table}`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});
*/

/*
app.get('/test', (req, res) => {
  const { table } = req.query;

  pool.query(`select * from ${table} where id=1`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
    });
  });

  app.post('/test', (req, res) => {
    const { table } = req.query;
  
    pool.query(`INSERT INTO sample (id, name) VALUES (9, 'Jorkki')`, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.send(results);
      }
      });
    });
    */

const passport = require('./utils/pass');
const testRoute = require('./routes/testRoute');

const postRoute = require('./routes/postRoute');
app.use('/post', postRoute);

const messageRoute = require('./routes/messageRoute');
app.use('/message', messageRoute);

const authRoute = require('./routes/authRoute');

app.use('/test', testRoute);
app.use('/auth', authRoute);

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(
    `App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`
  );
});
