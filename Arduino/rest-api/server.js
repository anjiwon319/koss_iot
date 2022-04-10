const mongoose = require("mongoose");
require("dotenv").config({ path: "variable.env" });

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
