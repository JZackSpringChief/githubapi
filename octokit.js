import { Octokit } from "octokit";
import { config } from "dotenv";

config();

export const octokit = new Octokit({
  auth: process.env.GIT_KEY,
});

await octokit.request("GET /repos/{owner}/{repo}/issues", {
  owner: "octocat",
  repo: "Spoon-Knife",
});
