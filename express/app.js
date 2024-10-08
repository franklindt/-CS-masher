const express = require('express')
const { faker } = require('@faker-js/faker');
const app = express()
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion, Db } = require('mongodb');
const dotenv = require('dotenv').config();

app.use(cors());
app.use(helmet());
app.use(compression());
app.disable('x-powered-by');

const port = 3001

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

app.get('/matches/:id', async (req, res) => {
  let id = req.params.id;
  res.setHeader('Content-Type', 'application/json');
  console.log("fetching matches for id " + id);

  await client.connect();
  const db = client.db("csmash");

  const user = await tryGetUser(db, id);
  if (user == null) {
    res.send("Not found");
    await client.close();
    return;
  }

  const matches = await tryGetMatches(db, user);
  console.log(matches);

  res.send(JSON.stringify(matches));

  await client.close();
})

const leetcode = require('./api/leetcode')

app.use(leetcode)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/**
 * 
 * @param {Db} db 
 * @param {*} currentUser 
 * 
 * @returns All available people 
 */
async function tryGetAllAvailable(db, currentUser) {
  const usersCollection = db.collection('users');

  const pipeline = { matches: { age: {$gte: 18}, UUID: {$ne: currentUser.UUID} } };

  const mutualMatches = (await usersCollection.find(pipeline).toArray()).sort((a, b) => {
    return a.ranking - b.ranking;
  }).filter((val) => {
    return val.gender != currentUser.gender;
  });

  return mutualMatches;
}

/**
 * 
 * @param {Db} db 
 * @param {*} currentUser 
 */
async function tryGetUser(db, uuid) {
  const usersCollection = db.collection('users');
  const pipeline = { "UUID": parseInt(uuid) };
  const matches = await usersCollection.findOne(pipeline);
  console.log("found user for uuid " + uuid + ": " + JSON.stringify(matches));
  return matches;
}

/**
 * 
 * @param {Db} db 
 * @param {*} currentUser 
 */
async function tryGetMatches(db, currentUser) {
  const usersCollection = db.collection('users');

  const pipeline = { matches: { $elemMatch: { $eq: currentUser.UUID } } };

  const mutualMatches = (await usersCollection.find(pipeline).toArray()).sort((a, b) => {
    return a.ranking - b.ranking;
  }).filter((val) => {
    return val.gender != currentUser.gender;
  });

  return mutualMatches;
}

/**
 * 
 * @param {Db} db 
 * @param {*} currentUser 
 * @param {*} toMatch 
 */
async function tryMatch(db, currentUser, toMatch) {
  // console.log(`Updated ${result} records`);
  const result = await db.collection("users").updateOne(
    { uuid: currentUser.UUID },
    { $addToSet: { matches: toMatch.UUID } }
  );
  console.log("tryMatch result " + result);
  return result;
}

app.post('/like/:from/:to', async (req, res) => {
  const from = req.params.from;
  const to = req.params.to;

  await client.connect();
  const db = client.db("csmash");

  const fromUser = await tryGetUser(db, from);
  if (fromUser == null) {
    await client.close();
    return;
  }

  const toUser = await tryGetUser(db, to);
  if (toUser == null) {
    await client.close();
    return;
  }

  const like = await tryMatch(db, fromUser, toUser);
  res.send(JSON.stringify(like));

  console.log(`Processing like from ${JSON.stringify(fromUser)} to ${JSON.stringify(toUser)}: ${JSON.stringify(like)}`);

  await client.close();
});

app.get("/feed/:id", async (req, res) => {
  const id = req.params;
  
  await client.connect();
  const db = client.db("csmash");

  const user = await tryGetUser(db, id);
  if (user == null) {
    await client.close();
    return;
  }

  const feed = await tryGetAllAvailable(db, user);
  console.log(`Sending feed of ${JSON.stringify(user)}: ${JSON.stringify(feed)}`);
  res.send(JSON.stringify(feed));

  await client.close();
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("csmash").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // TODO --- Get Current User Information --- 
    // 

    // TODO --- MATCHMAKING ALGORITHM --- 
    // 
    // 
    // 
    // potential match queue of first 15 users
    // only show users of desired sex 
    // 
    // sort users by user.matchedUser.profile.ranking
    //    IF swiped right (good):
    //      if current user is in swiped user's right list
    //        open chat
    //      else
    //        add swiped user to current user's right list 
    //    IF swiped left (bad)  :
    //      remove user from match queue
    // client.db("csmash").collection("users").aggregate()

    // console.log(client);
    // let users = [];
    // for (var i = 0; i < 100; i++) {
    //   let matchIds = [];
    //   for(var j=0;j<3;j++) {
    //     matchIds[i] = Math.floor(Math.random() * 100);
    //   }
    //   const data = {
    //     // UUID: faker.string.uuid(),
    //     UUID: i+1,
    //     fakeUser: true,
    //     email: faker.internet.email(),
    //     leetcodeUsername: faker.internet.userName(),
    //     wpm: Math.floor(Math.random() * 100),
    //     ranking: Math.floor(Math.random() * 1000000),
    //     gender: faker.person.sex(),
    //     age: 18 + Math.floor(Math.random() * 5),
    //     matches: matchIds,
    //     showers: Math.floor(Math.random() * 7),
    //     playsLeague: (Math.random() > 0.5)
    //   };
    //   users.push(data);
    // }
    // let a = await client.db("csmash").collection("users").insertMany(users);
    // console.log(a);

    // const currentUser = { "_id": { "$oid": "66e69a23b1cbff380623b90e" }, "UUID": 1, "fakeUser": true, "name": "Payton", "leetcodeUsername": "Karelle85", "wpm": { "$numberInt": "62" }, "ranking": { "$numberInt": "151909" }, "gender": "male", "age": { "$numberInt": "18" }, "matches": [{ "$numberInt": "1" }] };
    // const matches = await tryGetMatches(client.db("csmash"), currentUser);
    // console.log(matches);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// run().catch(console.dir);
