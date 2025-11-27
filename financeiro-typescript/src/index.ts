import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import financeiroRouter from './routes/financeiroRouter'

const app = express();

app.use(cors());
app.use(express.json());

app.use("/v1/financeiro", financeiroRouter);

export default app;


