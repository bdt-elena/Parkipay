const express = require('express');
const mongoose = require('mongoose');
const routerApi = require('./routes/');
const cors = require('cors');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
//const { ESLint } = require('eslint');
const app = express();
const port = 3001;

const uri = "mongodb+srv://user:user@prograweb2.9ompijn.mongodb.net/test";

app.use(cors());

async function connect(){
  try{
    await mongoose.connect(uri, {useNewUrlParser:true});
    // eslint-disable-next-line no-console
    console.log("connected to MongoDB");
  }catch(error){
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

app.use(
  express.json({
    extended: false, // permite codificar matrices y objetos enriquecidos en formato codificado en url
  })
);
app.get('/', (req, res) => res.send('Ruta principal'));
console.log("aqui toy");
routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
connect();
// eslint-disable-next-line no-console
app.listen(port, () => console.log('Mi puerto', port));
