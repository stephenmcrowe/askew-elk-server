const config = {
  local: {
    database: {
      host: 'us-cdbr-east-06.cleardb.net',
      user: 'b9b2d684f477e3', // 'your localhost username here'
      password: '9447c003', // your localhost password here'
      schema: 'heroku_a0126caf6ceeffc', // 'your localhost default schema here'

      // host: 'localhost',
      // user: 'root', // 'your localhost username here'
      // password: 'password', // your localhost password here'
      // schema: 'heroku_a0126caf6ceeffc', // 'your localhost default schema here'
    },
    port: 3000,
  },
};

// use localhost if enviroment not specified
const env = process.argv[2] || 'local';

export default config[env];
