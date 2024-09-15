const express = require('express')
const app = express()
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');


app.use(cors());
app.use(helmet());
app.use(compression());
app.disable('x-powered-by');


const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


