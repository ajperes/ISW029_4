import express from "express"
import bodyParser from "body-parser"
//
import router from "./routes"
import sequelize from "./config/database"


const app = express();
app.use(bodyParser.json());
app.use(router);


const SV_PORT = process.env.SV_PORT || 4000;

let DB_RESET;
if (process.env.DB_RESET !== undefined)
  DB_RESET = process.env.DB_RESET.toLowerCase();
else
  DB_RESET = false;

sequelize.sync({ force: DB_RESET }).then(async() => {
  console.log('\nDatabase synchronized');

  app.listen(SV_PORT, () => {
    console.log(`\nServer running on ` + SV_PORT);
  });
}).catch((err) => {
  console.log("\nERROR: \n\t" + process.env.DB_PORT + "\n\tFull log: \n" + err);
});
