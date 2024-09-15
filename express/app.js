const express = require('express')
const {faker} = require('@faker-js/faker');
const app = express()
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion} = require('mongodb');
const dotenv = require('dotenv').config();

app.use(cors());
app.use(helmet());
app.use(compression());
app.disable('x-powered-by');

const port = 3000

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@meowmeow.4kfr5.mongodb.net/?retryWrites=true&w=majority&appName=meowmeow`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("csmash").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    let users = [];
    console.log(client);
    for (var i = 0; i < 100; i++) {
        const data = {
            fakeUser: true,
            name: faker.person.firstName(),
            zodiacSign: faker.person.zodiacSign(),
            leetcodeUsername: faker.internet.userName(),
            wpm: Math.floor(Math.random() * 100),
            easySolved: Math.floor(Math.random() * 100),
            mediumSolved: Math.floor(Math.random() * 100),
            hardSolved: Math.floor(Math.random() * 20),
            gender: faker.person.sex(),
            age: 18 + Math.floor(Math.random() * 5),
            discordId: faker.string.uuid()
        };
        users.push(data);
    }
    let a = await client.db("csmash").collection("users").insertMany(users);
    console.log(a);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);