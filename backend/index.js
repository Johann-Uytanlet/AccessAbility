import express from "express";
import { PORT } from "./config.js";
import cors from "cors";
import router from "./router.js";

const app = express();

app.use(express.json());

app.use(cors());
app.use(router);


app.get('/', (req, res) =>{
   console.log(req);
   return res.status(234).send("nice"); 
});

app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});