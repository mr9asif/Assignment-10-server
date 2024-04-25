const express = require('express');
const cors = require('cors')
const port = process.env.PORT || 2000;

const app = express();

// middle ware
app.use(cors());

// get here
app.get('/', (req,res)=>{
    res.send('sever is running...')
})





app.listen(port, ()=>{
    console.log(`server is running ..${port}`)
})