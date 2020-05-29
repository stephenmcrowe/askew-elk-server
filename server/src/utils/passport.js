/* eslint-disable consistent-return */
// lets import some stuff
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { comparePasswords } from './encrypt';
import { cnfg, Database } from '../db';

// options for local strategy, we'll use username (found in POST body)
const localOptions = { usernameField: 'username' };

// options for jwt strategy
// we'll pass in the jwt in an `Authorization` header prefixed with JWT
// so passport can find it there
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: 'secret',
};
// NOTE: we are not using a bearer token, disregard information about bearer tokens on the internet.

// username + password authentication strategy
const GET_PASSWORD = `
SELECT userID, username, password, salt
FROM Users 
WHERE username = ?`;
const localLogin = new LocalStrategy(localOptions, (username, password, done) => {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  const db = new Database(cnfg);
  db.query(GET_PASSWORD, username)
    .then((results) => {
      if (Array.isArray(results) && results.length) {
        const encryptedPassword = results[0].password.toString();
        const salt = results[0].salt.toString();
        if (comparePasswords(password, encryptedPassword, salt)) {
          // Send the object to the req through req.user
          done(null, results[0]);
        } else {
          // Password didn't match username here
          done(null, { status: 401, error: 'Invalid username or password' });
        }
      } else {
        // Array came back empty so no user found
        done(null, { status: 401, error: 'Username not found' });
      }
      return db.close();
    })
    .catch((err) => {
      db.close();
      console.log(err);
      // MYSQL error
      done(err, false);
    });
});

const CHECK_IF_EXISTS = `
SELECT userID, username
FROM Users 
WHERE username = ?`;
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // JWT passed checks. Just need to see if the user ID
  // in the payload exists in our database
  const db = new Database(cnfg);
  db.query(CHECK_IF_EXISTS, payload.username)
    .then((results) => {
      if (Array.isArray(results) && results.length) {
        done(null, results[0]);
      } else {
        done(null, false);
      }
      return db.close();
    })
    .catch((err) => {
      db.close();
      console.log(err);
      done(err, false);
    });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);


export const requireAuth = passport.authenticate('jwt', { session: false });
export const requireSignin = passport.authenticate('local', { session: false });
