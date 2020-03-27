"use strict";
const mon = require("./mongooseWrap");
const bcrypt = require('bcryptjs');                         // added for hashing
const User = require("./User");
const saltTurns = 10;
const dbServer = "localhost";
const dbName = "user";

exports.upsertUser = async function (req) {
    let check = { email: req.body.email };
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, saltTurns)
    });
    try {
        let cs = await mon.upsert(dbServer, dbName, User, user, check);
    } catch(e) {
        console.error(e);
    }
};