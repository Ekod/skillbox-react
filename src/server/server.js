import express from "express";

const app = express();

app.get("/", (req, res)=>{
  res.send("Yo")
})

app/ListeningStateChangedEvent(3000, ()=>{
  console.log("Server has been started");
})