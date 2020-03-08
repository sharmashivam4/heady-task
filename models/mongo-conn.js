// Bring Mongoose into the app
var mongoose = require( 'mongoose' );

var connectionUri = 'mongodb://localhost:27017/heady_task';

var mongoConnOptions = Object.assign({
  "useNewUrlParser": true,
  "useUnifiedTopology": true,
  "connectTimeoutMS": 30000,
  "poolSize": 10
});

// Create the database connection
mongoose.connect(connectionUri, mongoConnOptions);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('[INFO]: Mongoose default connection opened');
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.error('[ERROR]: Mongoose default connection error: ' + err);
  process.exit(1);
});

// When the connection is disconnected
// mongoose.connection.on('disconnected', function () {
//   console.log('[INFO]: Mongoose default connection disconnected');
//   process.exit(1);
// });

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('[INFO]: Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = mongoose;
