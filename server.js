import express from "express";
import githubProfile from "github-profile";

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

githubProfile("jzacksc@gmail.com").then((profile) => {
  console.log(profile);
});
