import mysql from 'mysql';
import config from './config';

// Promisify the mysql connection
// https://codeburst.io/node-js-mysql-and-promises-4c3be599909b

export class Database {
  constructor(cnfg) {
    this.connection = mysql.createConnection(cnfg);
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) { return reject(err); }
        return resolve(rows);
      });
    });
  }

  createTransaction(callback) {
    return new Promise((resolve, reject) => {
      this.connection.beginTransaction((err) => {
        if (err) { reject(err); }

        return callback(this)
          .then((result) => {
            this.connection.commit();
            this.connection.end();
            resolve(result);
          })
          .catch((error) => {
            this.connection.rollback();
            this.connection.end();
            reject(error);
          });
      });
    });
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) { return reject(err); }
        return resolve();
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) { return reject(err); }
        return resolve();
      });
    });
  }
}

export const cnfg = {
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.schema,
  dateStrings: 'date',
};
