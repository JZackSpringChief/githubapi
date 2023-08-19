import express from "express";
import { Octokit } from "octokit";

const app = express();
const port = 5524;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("server is up");
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});

const octokit = new Octokit({
  auth: "YOUR-TOKEN",
});
