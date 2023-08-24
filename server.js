import express from "express";
import { Octokit, App } from "octokit";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 5524;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const octokit = new Octokit({
  auth: process.env.GIT_KEY,
});
// console.log(process.env.GIT_KEY);

//authentication for user data
async function getUser() {
  const { data } = await octokit.request("/user");
  // console.log(data);
}
getUser();
// todo set up endpoint and middle ware later

// repo commit status?

// octokit.rest.repos.getCommit({
//   owner,
//   repo,
//   ref,
// });

octokit.rest.repos
  .createForAuthenticatedUser({
    name: "API TEST",
  })
  .then((response) => console.log("repo has been created"));

// octokit.rest.repos.getCommitActivityStats({
//   owner: "jzacksc@gmail.com",
//   repo: "backendRefresher",
// });

app.get("/", (req, res) => {
  res.send("server is up");
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
