var env = process.env.NODE_ENV || 'development';
console.log('env *******', env)

if (env === 'development' || env === 'test') {
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  })
}

// if (env === 'development') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'

// } else if (env === 'test') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
// }
//



//mongodb://heroku_4cw33bxh:k9nl7bvi827at1st8e4j1k0tpr@ds151997.mlab.com:51997/heroku_4cw33bxh

//    protocol://username:password@address:port/database