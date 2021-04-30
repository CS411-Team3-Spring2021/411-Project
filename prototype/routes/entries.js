const mongoose = require("mongoose");
const Schema = mongoose.Schema; //schema object
const entrySchema = new Schema( //structure of a user's entry
    {
        entry: String,
        date: String,
        user_id: String,
        feeling: String,
        movies: String,
    },
    { timestamps: true }
); //timestamps created when object gets saved

//const to store model in
const Entry = mongoose.model("Entry", entrySchema); // pluralizes ?
//not sure if entry --> entries will be a problem ?
module.exports = Entry;
