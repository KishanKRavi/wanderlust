// const mongoose = require("mongoose");
// const listing = require("../models/listing.js");
// const newData = require("./data.js");


// main().then(res=>{
//     console.log("connection of database established");
// })
// .catch(err=>{
//     console.log(err);
// })

// async function main() {
//     await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
// }

// const init = async()=>{
//     await listing.deleteMany({});
//     await listing.insertMany(newData.data);
//     console.log("data newly added to DB");
// }

// init();



const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();