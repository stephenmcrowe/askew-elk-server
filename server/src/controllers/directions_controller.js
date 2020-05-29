import mysql from 'mysql';
import { Database, cnfg } from '../db';

const UPDATE_DIRECTION = 'UPDATE directions SET Direction = ? WHERE RecipeID = (SELECT RecipeID FROM recipes WHERE RecipeAuthor = ? AND RecipeID = ?) AND StepNumber = ?';
export const updateDirection = (req, res) => {
  const db = new Database(cnfg);
  db.query(UPDATE_DIRECTION, [req.body.Direction, req.user.userID, req.params.id, req.body.StepNumber])
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

