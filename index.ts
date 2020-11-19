import express from "express";
import bodyParser from "body-parser";
import { router } from './router';

const  conf = require('./config');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('', router);

app.listen(conf.port, () => {
  console.log(`Example app listening at http://localhost:${conf.port}`)
})

