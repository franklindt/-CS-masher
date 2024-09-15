const express = require('express')
const app = express()
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');



const corsOptions = require('./config/cors.config');
const connectMongo = require('./config/mongo.config');

app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(bodyParser());
app.disable('x-powered-by');


const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const leetcode = require('./api/leetcode')

app.use(leetcode)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


