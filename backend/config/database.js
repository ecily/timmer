const mongoose = require('mongoose')

const connectDatabase = () => {

mongoose.connect(process.env.DB_URI, {
//mongoose.connect(process.env.DB_LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
 }).then(con => {
     console.log(`MongoDB connected to: ${con.connection.host}`)
 })   

}

module.exports = connectDatabase

