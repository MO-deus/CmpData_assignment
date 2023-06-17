const mongoose = require("mongoose")

const contact_schema = mongoose.Schema({
    id: {
        type : Number,
        reqiured : [true, "Id is required"]
    },
    date: {
        type : String,
        reqiured : [true, "date is required"]
    },
    department: {
        type : String,
        reqiured : [true, "department is required"]
    },
    software: {
        type : String,
        reqiured : [true, "software is required"]
    },
    seats: {
        type : Number,
        reqiured : [true, "seats  is required"]
    },
    amount: {
        type : Number,
        reqiured : [true, "amount is required"]
    },

});

module.exports = mongoose.model("Coonect", contact_schema);