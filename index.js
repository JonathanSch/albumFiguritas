require('dotenv').config();
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const cors = require('cors');

require('./database').connectDatabase()

app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/user')
const janijRoutes = require('./routes/janij')
app.use('/api',userRoutes)
app.use('/janij', janijRoutes)

app.get('/',(req,res)=>{
    res.send({message:'Todo correcto'})
})


app.listen(PORT,(err)=>err?console.log(err):console.log(`Corriendo en el puerto ${PORT}`))