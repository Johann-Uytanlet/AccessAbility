import express from "express";
import { PORT } from "./config.js";
import markerRoutes from "./routes/markerRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
   console.log(req);
   return res.status(234).send("nice"); 
});

app.use('/marker', markerRoutes);

app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});