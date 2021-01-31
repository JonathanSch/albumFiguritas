const mongoose = require('mongoose')

const connectDatabase = () => {mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true },(err)=>{
    err?console.log(err):console.log('Database connected')
})
}

module.exports = {connectDatabase}