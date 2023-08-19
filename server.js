import express from "express";
const app = express();
const port = 5524;

app.get("/", (req, res) => {
  res.send("server is up");
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
