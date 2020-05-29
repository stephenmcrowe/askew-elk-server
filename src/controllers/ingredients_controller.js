import mysql from 'mysql';
import { Database, cnfg } from '../db';

const GET_ALL_INGREDIENTS = 'SELECT * FROM ingredients';
export const getIngredients = (req, res) => {
  const db = new Database(cnfg);
  db.query(GET_ALL_INGREDIENTS)
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

const CHECK_NEW_INGREDIENT = 'SELECT IngredientID FROM ingredients WHERE IngredientName = ?';
const CREATE_NEW_INGREDIENT = 'INSERT INTO ingredients (IngredientName) VALUES (?)';
const LAST_INSERT_ID = 'last_insert_id()';
const UPDATE_RECIPE_JOIN_INGREDIENT = 'UPDATE recipetoingredient SET IngredientID = ? WHERE RecipeID = ? AND IngredientID = ?';
export const updateIngredient = (req, res) => {
  const db = new Database(cnfg);
  db.createTransaction(() => {
    return db.query(CHECK_NEW_INGREDIENT, req.body.IngredientName)
      .then((result) => {
        if (result.length > 0) {
          return db.query(UPDATE_RECIPE_JOIN_INGREDIENT, [result[0].IngredientID, req.params.id, req.body.IngredientID]);
        } else {
          return db.query(CREATE_NEW_INGREDIENT, (req.body.IngredientName))
            .then(() => {
              return db.query(UPDATE_RECIPE_JOIN_INGREDIENT, [mysql.raw(LAST_INSERT_ID), req.params.id, req.body.IngredientID]);
            });
        }
      });
  })
    .then((result) => {
      res.status(200).json({ error: null, response: 'Ingredient Update Successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
};
