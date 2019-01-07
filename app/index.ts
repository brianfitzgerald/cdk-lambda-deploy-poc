import * as express from "express";
import { serveApp } from "../lib/cdk-app-stack";

const app = express();

app.get("/meme", (req, res) => {
    console.log("meme", req)
    res.status(200)
})
app.get("/meme2", (req, res) => {
    console.log("meme2", req)
    res.status(200)
})

export default app
