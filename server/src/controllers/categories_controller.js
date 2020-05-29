import mysql from 'mysql';
import { Database, cnfg } from '../db';

const GET_CATEGORY = 'SELECT CategoryID FROM categories WHERE CategoryName = ?';
export const getCategory = (req, res) => {
  const db = new Database(cnfg);
  db.query(GET_CATEGORY, req.body.CategoryName)
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

const CHECK_NEW_CATEGORY = 'SELECT CategoryID FROM categories WHERE CategoryName = ?';
const CREATE_NEW_CATEGORY = 'INSERT INTO categories (CategoryName) VALUES (?)';
const LAST_INSERT_ID = 'last_insert_id()';
const UPDATE_RECIPE_JOIN_CATEGORY = 'UPDATE recipetocategory SET CategoryID = ? WHERE RecipeID = ? AND CategoryID = ?';
export const updateCategory = (req, res) => {
  const db = new Database(cnfg);
  db.createTransaction(() => {
    return db.query(CHECK_NEW_CATEGORY, req.body.CategoryName)
      .then((result) => {
        if (result.length > 0) {
          return db.query(UPDATE_RECIPE_JOIN_CATEGORY, [result[0].CategoryID, req.params.id, req.body.CategoryID]);
        } else {
          return db.query(CREATE_NEW_CATEGORY, (req.body.CategoryName))
            .then(() => {
              return db.query(UPDATE_RECIPE_JOIN_CATEGORY, [mysql.raw(LAST_INSERT_ID), req.params.id, req.body.CategoryID]);
            });
        }
      });
  })
    .then((result) => {
      res.status(200).json({ error: null, response: 'Category Update Successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
};
