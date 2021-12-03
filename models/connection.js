const mongoose = require('mongoose');


var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
 };


mongoose.connect('mongodb+srv://admin:MongoPassWord@cluster0.jutpi.mongodb.net/mymovizapp?retryWrites=true&w=majority',
   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because u suck but actually : --> ${err}`);
    } else {
      console.info('*** Database MyMovizApp connection : Success ***');
    }
   }
);
