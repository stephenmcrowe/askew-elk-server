/**
 * User controller - Askew Elk
 * Implements CRUD operations for the users table
 */
import mysql from 'mysql';
import { Database, cnfg } from '../db';

/*
 * getUser()
 * Select a username based on the user id
 * (unused)
 */
const WHERE_ID = 'WHERE UserID = ?';
const SELECT_ONE = 'SELECT UserName FROM users';
const SELECT_BY_ID = `${SELECT_ONE} ${WHERE_ID}`;
export const getUser = (req, res) => {
  const db = new Database(cnfg);
  db.query(SELECT_BY_ID, req.params.id)
    .then((result) => {
      res.status(200).json({ error: null, response: result[0] });
      return db.close();
    })
    .catch((err) => {
      db.close();
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
};

/*
 * getUsers()
 * Select all the userids and usernames from the users table
 * (unused)
 */ 
const SELECT_ALL = 'SELECT UserID, UserName FROM users';
export const getUsers = (req, res) => {
  const db = new Database(cnfg);
  db.query(SELECT_ALL)
    .then((result) => {
      res.status(200).json({ error: null, response: result });
      return db.close();
    })
    .catch((err) => {
      db.close();
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
};

/*
 * updateUser()
 * Change a user's username
 * (unused)
 */ 
const UPDATE_USER = `UPDATE users SET UserName = ? ${WHERE_ID}`;
export const updateUser = (req, res) => {
  const db = new Database(cnfg);
  db.query(UPDATE_USER, [req.body.UserName, req.user.userID])
    .then(() => {
      res.status(200).json({ error: null, response: 'Update succeeded' });
      return db.close();
    })
    .catch((err) => {
      db.close();
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
};

/*
 * deleteUser()
 * Delete a user from the users table given their id
 * (unused)
 */
const DELETE_USER = `DELETE FROM users ${WHERE_ID}`;
export const deleteUser = (req, res) => {
  const db = new Database(cnfg);
  db.query(DELETE_USER, [req.user.userID])
    .then(() => {
      res.status(200).json({ error: null, response: 'Delete succeeded' });
      return db.close();
    })
    .catch((err) => {
      db.close();
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
};
