import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/newtestdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

let database = mongoose.connection;

database.on('error', () => {
  console.log("error")
})

database.on('open', () => {
  console.log("Database connected");
})
