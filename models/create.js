const mongoose = require('mongoose')
const moment = require('moment')
let time = moment().format('MMMM Do YYYY, h:mm:ss a');
const createSchema = mongoose.Schema({
    title: {
        type : String,
        required : true
    },
    author: {
        type: String,
        required : true
    },
    description: {
        type: String,
        required : true
    },
    
    createdOn : {
        type : String,
        default :time
    }
})

module.exports = mongoose.model("create",createSchema)