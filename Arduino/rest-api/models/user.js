const mongoose = reqiure("mongoose");
const { Schema } = mongoose; // 기존 문법 const Schema = mongoose.Schema 문법의 축약형

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        name: String,
        age: {
            type: Number,
            min: 18,
            max: 50,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.module("User", userSchema)

