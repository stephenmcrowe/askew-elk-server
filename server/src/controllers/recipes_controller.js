/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/**
 * Recipes Controller - Askew Elk
 * 
 * Implement CRUD operations for the recipes table and associated
 * tables: Ingredients, Directions, Categories
 */
import mysql from 'mysql';
import { Database, cnfg } from '../db';

/**
 * getRecipe()
 * Return the detailed description for the given RecipeID
 * Includes: Name, Author, Desription, Ratings, Directions
 * Ingredients, Categories
 */
const SELECT_ONE = `
SELECT r.RecipeID AS id, r.RecipeName, u.UserName AS RecipeAuthor, r.Rating, r.NumberOfRatings, r.Description, r.DateAdded, 
(SELECT GROUP_CONCAT(DISTINCT c.CategoryName ORDER BY c.CategoryName ASC SEPARATOR '|') 
  FROM recipes r JOIN recipetocategory rc ON rc.RecipeID = r.RecipeID
  JOIN categories c ON c.CategoryID = rc.CategoryID
  WHERE r.RecipeID = ?) AS Categories,
GROUP_CONCAT(DISTINCT i.IngredientName ORDER BY i.IngredientName DESC SEPARATOR '|') as Ingredients,
GROUP_CONCAT(DISTINCT d.Direction ORDER BY d.StepNumber ASC SEPARATOR '|') as Directions
FROM recipes r
JOIN recipetoingredient ri  ON ri.RecipeID = r.RecipeID
JOIN ingredients i ON i.IngredientID = ri.IngredientID
JOIN directions d ON r.RecipeID = d.RecipeID
JOIN users u ON r.RecipeAuthor = u.UserID
WHERE r.RecipeID = ?;
`;
export const getRecipe = (req, res) => {
  const db = new Database(cnfg);
  db.createTransaction(() => {
    return db.query(SELECT_ONE, [req.params.id, req.params.id]);
  })
    .then((result) => {
      const recipe = result[0];
      recipe.Categories = recipe.Categories ? recipe.Categories.split('|') : [];
      recipe.Ingredients = recipe.Ingredients.split('|');
      recipe.Directions = recipe.Directions.split('|');
      res.status(200).json({ error: null, response: recipe });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
};

/**
 * getRecipes()
 * Return an array of brief recipe descriptions
 * Includes: name, Author, Rating, DateAdded, and Description
 * For use in browse and search situations
 * The request can specify search on several categories,
 * including: title and author
 */
const SELECT_ALL = `
SELECT RecipeID AS id, RecipeName, u.UserName AS RecipeAuthor, Rating, DateAdded, Description
FROM Recipes r JOIN Users u ON r.RecipeAuthor = u.UserID`;
const SELECT_WHERE = `${SELECT_ALL}
WHERE ?`;
export const getRecipes = (req, res) => {
  let query = [];

  if ('byUser' in req.query) {
    query.push(`r.RecipeAuthor = ${req.user.userID}`);
    delete req.query.byUser;
  }

  // Parse in the query entries
  Object.entries(req.query).forEach(([k, v]) => {
    if (k === 'RecipeName') {
      query.push(`${k} LIKE '%${v}%'`);
    } else {
      query.push(`${k} = '${v}'`);
    }
  });

  const db = new Database(cnfg);
  if (query.length === 0) {
    db.createTransaction(() => {
      return db.query(SELECT_ALL);
    })
      .then((result) => {
        res.status(200).json({ error: null, response: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.sqlMessage, response: null });
      });
  } else {
    query = mysql.raw(query.join(' AND '));
    db.createTransaction(() => {
      return db.query(SELECT_WHERE, query);
    })
      .then((result) => {
        res.status(200).json({ error: null, response: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.sqlMessage, response: null });
      });
  }
};

/**
 * addRecipe()
 * Request to add a recipe to the database
 * The request description is formatted below
 * on success, returns the recipeID of the newly
 * created Recipe
 */
/* Queries for adding to recipe and directions table */
const ADD_RECIPE = 'INSERT INTO Recipes(RecipeName,RecipeAuthor, Description, DateAdded) VALUES(?,?,?,?)';
const ADD_DIRECTIONS = 'INSERT INTO Directions (recipeID, StepNumber, Direction) VALUES ? ';

/* Useful queries for getting auto-incremented keys */
const LAST_INSERT_ID = 'last_insert_id()';
const GET_LAST_INSERT_ID = 'SELECT last_insert_id() AS ID';

/* Queries for adding ingredients */
const CHECK_INGREDIENT = 'SELECT IngredientID FROM Ingredients WHERE IngredientName = ?';
const ADD_INGREDIENT = 'INSERT INTO Ingredients (IngredientName) VALUES (?)';
const ADD_RECIPE_JOIN_INGREDIENT = 'INSERT INTO recipetoingredient VALUES (?, ?)';

/* Queries for adding categories */
const CHECK_CATEGORY = 'SELECT CategoryID FROM Categories WHERE CategoryName = ?';
const ADD_CATEGORY = 'INSERT INTO Categories (CategoryName) VALUES (?)';
const ADD_RECIPE_JOIN_CATEGORY = 'INSERT INTO recipetocategory VALUES (?, ?)';

/** We expect a request to look like this
 * {
 *  RecipeName:""
 *  Description:""
 *  Directions:{#, text},{#, text}}
 *  Ingredients:["","",""]
 *  Category:["","",""]
 * }
 */
export const addRecipe = (req, res) => {
  const insertRecipe = [];

  insertRecipe.push(`${req.body.RecipeName}`);
  insertRecipe.push(`${req.user.userID}`);

  if ('Description' in req.body) {
    insertRecipe.push(req.body.Description);
  } else {
    insertRecipe.push(mysql.raw('NULL'));
  }
  insertRecipe.push(mysql.raw('NOW()'));

  if (!req.body.Directions || req.body.Directions.length === 0) {
    return res.status(400).json({
      error: 'Directions must be included',
      response: null,
    });
  }
  if (!Array.isArray(req.body.Ingredients)
        || req.body.Ingredients.length === 0) {
    return res.status(400).json({
      error: 'Ingredients must be included',
      response: null,
    });
  }

  let recipeID = 0;
  const db = new Database(cnfg);
  db.createTransaction(() => {
    return db.query(ADD_RECIPE, insertRecipe)
      .then(() => {
        return db.query(GET_LAST_INSERT_ID);
      })
      .then((lastInsertIDResult) => {
        recipeID = lastInsertIDResult[0].ID;
        let directions = [];
        Object.entries(req.body.Directions).forEach(([k, v]) => {
          directions.push(`(${LAST_INSERT_ID},${k},"${v}")`);
        });
        directions = mysql.raw(directions.join(', '));
        return db.query(ADD_DIRECTIONS, directions);
      })
      .then(() => {
        const checkIngredientPromises = req.body.Ingredients.map((i) => {
          return db.query(CHECK_INGREDIENT, i);
        });
        return Promise.all(checkIngredientPromises);
      })
      .then(async (checkResult) => {
        const ingredientToLink = [];
        for (let i = 0; i < checkResult.length; i += 1) {
          const queryRes = checkResult[i];
          if (queryRes.length > 0) {
            ingredientToLink.push(db.query(
              ADD_RECIPE_JOIN_INGREDIENT, [recipeID, queryRes[0].IngredientID],
            ));
          } else {
            // Because LAST_INSERT_ID is being used here, queries must be done
            // sequentially, not parallelized like with Promise.all.
            // throw the error to the above catch block (transaction)
            await db.query(ADD_INGREDIENT, req.body.Ingredients[i]);
            await db.query(ADD_RECIPE_JOIN_INGREDIENT,
              [recipeID, mysql.raw(LAST_INSERT_ID)]);
          }
        }
        return Promise.all(ingredientToLink);
      })
      .then(() => {
        if (!Array.isArray(req.body.Categories)) {
          return Promise.resolve();
        }
        const checkCategoryPromises = req.body.Categories.map((c) => {
          return db.query(CHECK_CATEGORY, c);
        });
        return Promise.all(checkCategoryPromises);
      })
      .then(async (checkResult) => {
        if (!checkResult) {
          return Promise.resolve();
        }
        const categoryToLink = [];
        for (let i = 0; i < checkResult.length; i += 1) {
          const queryRes = checkResult[i];
          if (queryRes.length > 0) {
            categoryToLink.push(db.query(
              ADD_RECIPE_JOIN_CATEGORY, [recipeID, queryRes[0].CategoryID],
            ));
          } else {
            // Because LAST_INSERT_ID is being used here, queries must be done
            // sequentially, not parallelized like with Promise.all.
            // throw the error to the above catch block (transaction)
            await db.query(ADD_CATEGORY, req.body.Categories[i]);
            await db.query(ADD_RECIPE_JOIN_CATEGORY,
              [recipeID, mysql.raw(LAST_INSERT_ID)]);
          }
        }
        return Promise.all(categoryToLink);
      });
  })
    .then((result) => {
      res.status(200).json({ error: null, response: recipeID });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
};

/**
 * deleteRecipe()
 * Delete a recipe provided its recipeID and that the user is the creator
 * of this recipe
 */
const DELETE_RECIPE = 'DELETE FROM RECIPES WHERE recipeID = ? AND RecipeAuthor = ?';
export const deleteRecipe = (req, res) => {
  const db = new Database(cnfg);
  db.query(DELETE_RECIPE, [req.params.id, req.user.userID])
    .then((result) => {
      if (result.affectedRows === 0) {
        res.status(403).json({
          error: 'You cannot delete someone else\'s recipe!',
          response: null,
        });
      } else {
        res.status(200).json({ error: null, response: 'Delete succeeded' });
      }
      return db.close();
    })
    .catch((err) => {
      db.close();
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
};

/**
 * updateRecipe()
 * Responds to request to update a recipe based on its id
 * Also updates the directions, categories, and ingredients that are passed
 * If needed, it will insert new categories and ingredients
 * For simplicity it will always delete the directions and replace them
 */
const UPDATE_BOTH = 'UPDATE RECIPES SET Description = ?, RecipeName = ? WHERE RecipeID = ? AND RecipeAuthor = ?';
const DELETE_DIRECTIONS = 'DELETE FROM Directions WHERE RecipeID = ?';
const DELETE_RECIPE_TO_INGREDIENTS = 'DELETE FROM recipetoingredient WHERE RecipeID = ?';
const DELETE_RECIPE_TO_CATEGORY = 'DELETE FROM recipetocategory WHERE RecipeID = ?';
export const updateRecipe = (req, res) => {
  const db = new Database(cnfg);
  db.createTransaction(() => {
    return db.query(UPDATE_BOTH, [req.body.Description, req.body.RecipeName, mysql.raw(req.params.id), (req.user.userID)])
      .then(() => {
        return db.query(DELETE_DIRECTIONS, mysql.raw(req.params.id));
      })
      .then(() => {
        return db.query(DELETE_RECIPE_TO_INGREDIENTS, mysql.raw(req.params.id));
      })
      .then(() => {
        return db.query(DELETE_RECIPE_TO_CATEGORY, mysql.raw(req.params.id));
      })
      .then(() => {
        let directions = [];
        Object.entries(req.body.Directions).forEach(([k, v]) => {
          directions.push(`(${req.params.id},${k},"${v}")`);
        });
        directions = mysql.raw(directions.join(', '));
        return db.query(ADD_DIRECTIONS, directions);
      })
      .then(() => {
        const checkIngredientPromises = req.body.Ingredients.map((i) => {
          return db.query(CHECK_INGREDIENT, i);
        });
        return Promise.all(checkIngredientPromises);
      })
      .then(async (checkResult) => {
        const ingredientToLink = [];
        for (let i = 0; i < checkResult.length; i += 1) {
          const queryRes = checkResult[i];
          if (queryRes.length > 0) {
            ingredientToLink.push(db.query(
              ADD_RECIPE_JOIN_INGREDIENT, [req.params.id, queryRes[0].IngredientID],
            ));
          } else {
            // Because LAST_INSERT_ID is being used here, queries must be done
            // sequentially, not parallelized like with Promise.all.
            // throw the error to the above catch block (transaction)
            await db.query(ADD_INGREDIENT, req.body.Ingredients[i]);
            await db.query(ADD_RECIPE_JOIN_INGREDIENT,
              [req.params.id, mysql.raw(LAST_INSERT_ID)]);
          }
        }
        return Promise.all(ingredientToLink);
      })
      .then(() => {
        if (!Array.isArray(req.body.Categories)) {
          return Promise.resolve();
        }
        const checkCategoryPromises = req.body.Categories.map((c) => {
          return db.query(CHECK_CATEGORY, c);
        });
        return Promise.all(checkCategoryPromises);
      })
      .then(async (checkResult) => {
        if (!checkResult) {
          return Promise.resolve();
        }
        const categoryToLink = [];
        for (let i = 0; i < checkResult.length; i += 1) {
          const queryRes = checkResult[i];
          if (queryRes.length > 0) {
            categoryToLink.push(db.query(
              ADD_RECIPE_JOIN_CATEGORY, [req.params.id, queryRes[0].CategoryID],
            ));
          } else {
            // Because LAST_INSERT_ID is being used here, queries must be done
            // sequentially, not parallelized like with Promise.all.
            // throw the error to the above catch block (transaction)
            await db.query(ADD_CATEGORY, req.body.Categories[i]);
            await db.query(ADD_RECIPE_JOIN_CATEGORY,
              [req.params.id, mysql.raw(LAST_INSERT_ID)]);
          }
        }
        return Promise.all(categoryToLink);
      })
      .then(() => { return Promise.resolve(req.params.id); });
  })
    .then((result) => {
      res.status(200).json({ error: null, response: req.params.id });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
};
