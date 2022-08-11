require("dotenv").config();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const username = encodeURIComponent("sharfuddin");
const password = encodeURIComponent(process.env.DATABASE_PASSWORD);

let uri = `mongodb+srv://${username}:${password}@cluster0.kr45dsk.mongodb.net/?retryWrites=true&w=majority`;
let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(uri)
    .then((client) => {
      _db = client.db();
      console.log("connected");
      callback();
    })
    .catch((error) => {
      console.log(error);
      throw new error();
    });
};

const getDb=()=>{
  if(_db){
    return _db;
  }
  throw "No database found!"
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
