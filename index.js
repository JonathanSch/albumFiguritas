require('dotenv').config(); 
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const cors = require('cors');

require('./database').connectDatabase()

app.use(express.json());
app.use(cors());

const router = require('./routes')
app.use('/api',router)

app.get('/',(req,res)=>{
    res.send({message:'Todo correcto'})
})


app.listen(PORT,(err)=>err?console.log(err):console.log(`Corriendo en el puerto ${PORT}`))