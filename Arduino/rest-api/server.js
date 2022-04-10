const express = require("express");
const mongoose = require("mongoose");
const server = express();
const user = require("./models/user");
require("dotenv").config({ path: "variable.env" });

server.get("/", function (req, res) {
    const newUser = new user();
    newUser.email = "0chae@kookmin.ac.kr";
    newUser.name = "공채연";
    newUser.age = 22;
    newUser
        .save()
        .then(function (data) {
            console.log(data);
            res.json({
                message: "User Create Successfully",
            });
        })
        .catch(function (err) {
            res.json({
                message: "User was not Successfully created"
            });
        });

});

server.listen(3000, function (err) {
    if (err) {
        return console.log(err);
    } else {
        mongoose.connect(
            process.env.MONGODB_URL,
            { useNewUrlParser: true, useUnifiedTopology: true },
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Conneted to database successfully");
                }
            }
        );
    }
});