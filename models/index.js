const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.owners = require("./owners.model.js")(mongoose);
db.diaries = require("./diaries.model.js")(mongoose);
db.posts = require("./posts.model.js")(mongoose);
db.comments = require("./comments.model.js")(mongoose);

module.exports = db;