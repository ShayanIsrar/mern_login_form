const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/auth.router');
const router = require('./routes/product.router');

require('dotenv').config();
require('./models/db')
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res)=>{
    res.send('This is the Ping Page for you...')
})

app.use(bodyParser.json());
app.use(cors())
app.use('/auth', authRouter)
app.use('/products', router)

app.listen(PORT, ()=>{
    console.log(`Server is Running http://localhost:${PORT}`)
})