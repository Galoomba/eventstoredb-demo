import express, { Request, Response } from "express";
import streamEvents from "./service";
const app = express();


streamEvents()


app.listen(3012, () => {
  console.log('Server started with port 3012');
})


