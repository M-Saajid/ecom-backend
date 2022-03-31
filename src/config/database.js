const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const findOrCreate = require("mongoose-findorcreate");
const passportLocalMongoose = require("passport-local-mongoose");

//database connection
mongoose.connect("mongodb://localhost:27017/ecom");
// mongoose.connect("mongodb+srv://admin-sk:0759342494@cluster0.jqida.mongodb.net/ecom");

//item schema
const itemSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  price: Number,
  rating: Number,
  quantity: Number,
  category: String
});
//customer schema
const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  stripeId: String,
  password: String,
  googleId: String
});
// plugin for the findorcreate
customerSchema.plugin(findOrCreate);
customerSchema.plugin(passportLocalMongoose);

//customer order Schema
const orderSchema = new mongoose.Schema({
  cusName: String,
  cusEmail: String,
  orderName: String,
  orderPrice: Number,
  orderQuantity: Number
});

// model
const items = mongoose.model("items", itemSchema);
const customers = mongoose.model("customers", customerSchema);
const orders = mongoose.model("orders", orderSchema);

passport.use(customers.createStrategy());

passport.serializeUser(function (newCustomer, done) {
  done(null, newCustomer._id);
});
passport.deserializeUser(function (id, done) {
  customers.findById(id, function (err, newCustomer) {
    done(err, newCustomer);
  });
});

//creating an aggregation function for search
const search = items.aggregate([
  {
    $search: {
      text: {
        query: "polo",
        path: "name"
      }
    }
  }
]);
console.log("search", search);

module.exports = { itemSchema, customerSchema, items, customers, orders };
