//global modules
const express = require("express"); // ПОДКЛЮЧЕНИЕ ЭКСПРЕСС
const cors = require("cors");
const bodyParser = require("body-parser");

//local modules
const config = require("./config.json")[process.env.NODE_ENV];
const route = require("./route");

//init app
const app = express(); // СОЗДАНИЕ ОБЪЕКТА НАШЕГО ПРИЛОЖЕНИЯ

//top level middlewares
app.use(cors());

app.use(bodyParser.json());

app.use("/", route); // the request should get response here -> all middlewares below will not be executed. But... uncomment the 2nd next() above... :(

//The 404 Route (ALWAYS Keep this as the last route)
app.use(function (req, res) {
  res.status(404).send("wrong way!!!");
});

app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`);
});
