import { tokenForUser, genSaltedPassword } from '../utils/encrypt';
import { Database, cnfg } from '../db';

/*
 * Signin route. Most of the work is done in passport.js.
 * Provide the username and password through POST body
 * return - a JWT token, the logged in user's uuid, and
 *          whether they are an admin
*/
const signin = (req, res) => {
  // Handle error to give more information back to the user
  if (req.user.error) { // req.user comes from passport
    res.status(req.user.status).json({
      error: req.user.error,
      response: null,
    });
  } else {
    res.status(200).json({
      error: null,
      response: {
        username: req.user.username,
        token: tokenForUser(req.user.username),
      },
    });
  }
};

const SIGNUP = 'INSERT INTO Users SET ?';
export const signup = (req, res) => {
  const payload = { username: req.body.username };
  Object.assign(payload, genSaltedPassword(req.body.password));
  const db = new Database(cnfg);
  db.query(SIGNUP, payload)
    .then(() => {
      res.status(200).json({
        error: null,
        response: {
          username: req.body.username,
          token: tokenForUser(req.body.username),
        },
      });
      return db.close();
    })
    .catch((err) => {
      db.close();
      console.log(err);
      let error = err;
      if (err.code === 'ER_DUP_ENTRY') {
        error = 'Username already exists';
      }
      res.status(500).json({ error, response: null });
    });
};

export default signin;
