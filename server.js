const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;

const MONGODB_URI = "mongodb+srv://deali-admin:holamundo@deali.nid9d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(MONGODB_URI || 'mongodb://localhost/deali', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log("Mongo is connected");
});

//Schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  phone: String
});

//Model
const User = mongoose.model('User', userSchema);

//Saving data to our database
const data = {
  name: "Andres Manuel Lopez Obrador",
  phone: "6641234567"
};

const userTest = new User(data);
// userTest.save((error) => {
//   if(error){
//     console.log("Ooops, something went wrong!");
//   }else{
//     console.log("Data has been saved!");
//   }
// })

app.get('/', (req, res) => {
  // res.send("Deali Server");
  User.find({})
  .then((data) => {
    console.log(data);
    res.json(data);
  })
  .catch((error) => {
    console.log(error);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

