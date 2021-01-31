const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;

require('./database').connectDatabase()

app.use(express.json());
app.use(require('cors')());
const router = require('./routes')
app.use('/api',router)


app.listen(PORT,(err)=>err?console.log(err):console.log(`Corriendo en el puerto ${PORT}`))