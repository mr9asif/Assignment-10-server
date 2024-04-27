const express = require('express');
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 2000;

const app = express();

// middle ware
app.use(cors());

// get here
app.get('/', (req,res)=>{
    res.send('sever is running...')
})
console.log(process.env.DB_PASS)

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p7hqbnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("TravelerDB");
    const TravelesCollection = database.collection("Traveles");

//    Multiple item post
       app.post('/tourists', async(req, res)=>{
        const Tourist = {
          title: "Record of a Shriveled Datum",
          content: "No bytes, no problem. Just insert a document, in MongoDB",
        }
          const options = { ordered: true };
          const result = await foods.insertOne(Tourist, options);
          res.send(result)
       })


    //    get
     app.get('/tourists', async(req, res)=>{
        const cursor = TravelesCollection.find();
        const result = await cursor.toArray();
        res.send(result)
     })






    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.listen(port, ()=>{
    console.log(`server is running ..${port}`)
})

