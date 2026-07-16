const mongoose = require("mongoose");
const { data } = require("./data");
const Product = require("../Model/product");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/portfoliio");
}

main()
  .then(() => console.log("Mongodb conect"))
  .catch((e) => {
    console.log("Error Occured ", e);
  });

const initDb = async () => {
  await Product.deleteMany({});
  await Product.insertMany(data);
};
initDb();
