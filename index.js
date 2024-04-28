require('dotenv').config()
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const port = process.env.PORT || 2000;

const app = express();
const cors = require('cors')
// middle ware
app.use(cors());
app.use(express.json())

// get here
app.get('/', (req,res)=>{
    res.send('sever is running...')
})



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
       app.post('/addTourists', async(req, res)=>{
        console.log(req.body)
        const tourist = req.body;
          
       
          const result = await TravelesCollection.insertOne(tourist);
          res.send(result)
          console.log(result)
       })

      //  put
      app.put('/update/:id', async(req,res)=>{
         console.log(req.params.id)
         const id= req.body.id;
         const query = {_id: new ObjectId(id)}
         const updateSport={
           $set:{
            touristSpotName:req.body.touristSpotName,
            countryName:req.body.countryName,
            location:req.body.location,
            description:req.body.description,
            averageCost:req.body.averageCost,
            seasonality:req.body.seasonality,
            travelTime:req.body.travelTime,
            totalvisitor:req.body.totalvisitor,
           }
           
         }
         const result = await TravelesCollection.updateOne( query,updateSport)
         res.send(result)
         console.log(result)
      })

    //    get
     app.get('/addTourists', async(req, res)=>{
        const cursor = TravelesCollection.find();
        const result = await cursor.toArray();
        res.send(result)
        console.log(result)
     })

    //  single tourist
    app.get('/viewDetails/:id', async(req, res)=>{
      const id = req.params.id;
      console.log(id)
      const query = {_id: new ObjectId(id)}
       const result = await TravelesCollection.findOne(query);
       console.log(result)
       res.send(result)
    })

    // DELETE
    app.delete('/delete/:id', async(req,res)=>{
        const id = req.params.id;
        const query={_id: new ObjectId(id)};
        const result=await TravelesCollection.deleteOne(query);
        res.send(result)
    })

    // update
    app.get('/update/:id', async(req, res)=>{
      const id = req.params.id;
      console.log(id)
      const query = {_id: new ObjectId(id)}
       const result = await TravelesCollection.findOne(query);
       console.log(result)
       res.send(result)
    })

     app.get('/myList/:email', async(req, res)=>{
        console.log(req.params)
       
        const query = {userEmail:  req.params.email}
        const result = await TravelesCollection.find(query).toArray()
        res.send(result)
        console.log(result)
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

// QGcOjw6mLlLsVg0Y
// Traveler
