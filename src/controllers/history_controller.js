/**
 * History controller - Askew Elk
 * Implement CRUD operations for the history/notes table
 */
import { Database, cnfg } from '../db';

/**
 * getHistory()
 * Gets the notes associated with a specific recipe and user (using those IDs)
 * This will return all notes for the recipe and user
 */
const SELECT_BY_RECIPE_AND_USER = 'SELECT r.RecipeName, h.DateOfEntry, h.Title, h.Notes FROM history h JOIN recipes r ON h.RecipeID = r.RecipeID WHERE h.RecipeID = ? AND h.UserID = ?';
export const getHistory = (req, res) => {
  const db = new Database(cnfg);
  db.query(SELECT_BY_RECIPE_AND_USER, [req.params.id, req.user.userID])
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
 * getHistories()
 * Responds to request for all of a user's notes regardless of recipe id
 * This query is functionally the same as above, but does not filter by recipe ID
 */
const SELECT_BY_USER = 'SELECT h.RecipeID, h.DateOfEntry, r.RecipeName, h.Title, h.Notes FROM history h JOIN recipes r ON h.RecipeID = r.RecipeID WHERE h.UserID = ?';
export const getHistories = (req, res) => {
  const db = new Database(cnfg);
  db.query(SELECT_BY_USER, req.user.userID)
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
 * updateHistory()
 * Provides functionality for updating notes (either title, or note text itself)
 * It may update one or the other, or both
 */
const UPDATE_HISTORY_NOTES = 'UPDATE history SET Notes = ? WHERE RecipeID = ? AND UserID = ? AND DateOfEntry = ?';
const UPDATE_HISTORY_TITLE = 'UPDATE history SET Title = ? WHERE RecipeID = ? AND UserID = ? AND DateOfEntry = ?';
const UPDATE_HISTORY_BOTH = 'UPDATE history SET Title = ?, Notes = ? WHERE RecipeID = ? AND UserID = ? AND DateOfEntry = ?';
export const updateHistory = (req, res) => {
  const db = new Database(cnfg);
  if ('Title' in req.body && 'Notes' in req.body) {
    db.query(UPDATE_HISTORY_BOTH, [req.body.Title, req.body.Notes, req.params.id, req.user.userID, req.body.DateOfEntry])
      .then(() => {
        res.status(200).json({ error: null, response: 'Update succeeded' });
        return db.close();
      })
      .catch((err) => {
        db.close();
        console.log(err);
        res.status(500).json({ error: err.sqlMessage, response: null });
      });
  } else if ('Title' in req.body) {
    db.query(UPDATE_HISTORY_TITLE, [req.body.Title, req.params.id, req.user.userID, req.body.DateOfEntry])
      .then(() => {
        res.status(200).json({ error: null, response: 'Update succeeded' });
        return db.close();
      })
      .catch((err) => {
        db.close();
        console.log(err);
        res.status(500).json({ error: err.sqlMessage, response: null });
      });
  } else {
    db.query(UPDATE_HISTORY_NOTES, [req.body.Notes, req.params.id, req.user.userID, req.body.DateOfEntry])
      .then(() => {
        res.status(200).json({ error: null, response: 'Update succeeded' });
        return db.close();
      })
      .catch((err) => {
        db.close();
        console.log(err);
        res.status(500).json({ error: err.sqlMessage, response: null });
      });
  }
};

/*
 * createHistory()
 * Creates a new note for the given user
 * Expects to be given the RecipeID, Title of the notes, and Note text
 */
const CREATE_HISTORY = 'INSERT INTO history VALUES (?, ?, NOW(), ?, ?)';
const GET_LAST_TIME = 'SELECT DateOfEntry FROM history WHERE RecipeID = ? AND UserID = ? ORDER BY DateOfEntry DESC LIMIT 1';
export const createHistory = (req, res) => {
  const db = new Database(cnfg);
  db.query(CREATE_HISTORY, [req.params.id, req.user.userID, req.body.Title, req.body.Notes])
    .then(() => {
      db.query(GET_LAST_TIME, [req.params.id, req.user.userID])
        .then((result) => {
          res.status(200).json({ error: null, response: result[0] });
        });
      return db.close();
    })
    .catch((err) => {
      db.close();
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
};

/*
 * deleteHistory()
 * Deletes a note by its primary key (RecipeID, UserID, DateOfEntry)
 */
const DELETE_HISTORY = 'DELETE FROM history WHERE RecipeID = ? AND UserID = ? AND DateOfEntry = ?';
export const deleteHistory = (req, res) => {
  const db = new Database(cnfg);
  db.query(DELETE_HISTORY, [req.params.id, req.user.userID, req.body.DateOfEntry])
    .then((result) => {
      res.status(200).json({ error: null, response: 'Delete succeeded' });
      return db.close();
    })
    .catch((err) => {
      db.close();
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
};
