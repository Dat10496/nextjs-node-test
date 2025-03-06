const mongoose = require("mongoose");
const { db } = require("../config/config.mongodb");

const connectString = `mongodb+srv://${db.username}:${db.password}@cluster0.eg0oa.mongodb.net/`;

class DataBase {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(connectString, {})
      .then(() => {
        console.log(`connect DB success ${connectString}`);
      })
      .catch((error) => {
        console.error("Connect DB error:", error);
      });
  }

  static getInstance() {
    if (!DataBase.instance) {
      DataBase.instance = new DataBase();
    }
    return DataBase.instance;
  }
}

module.exports = DataBase.getInstance();
