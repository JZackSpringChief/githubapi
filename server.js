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

const currentTime = Math.floor(new Date().getTime() / 1000);
const oneWeekAgo = currentTime - 604800;
console.log(currentTime, oneWeekAgo);

//authentication for user data
async function getUser(userId) {
  const data = await octokit.request(`GET /users/${userId}/events?per_page=100`, {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  }) 
  
  const filteredData = data.data.filter(item => {
    const eventTime = Math.floor(new Date(item.created_at).getTime() / 1000)
    return item.type === 'PushEvent' && eventTime > oneWeekAgo
  });
  
  console.log(filteredData);

  const dateAcc = {};
  // Wierdly broken
  const reduced = filteredData.reduce((dateAcc, current) => {
    const eventDay = new Date(current.created_at).getDate();
    // console.log(eventDay)
    if (!dateAcc.hasOwnProperty(eventDay)) {
      dateAcc[eventDay] = 0;
    }
    dateAcc[eventDay]++;
    return dateAcc;
  })
  
  // console.log(reduced);
  
  // const acc = {};
  // const reduced = data.data.reduce((acc, current) => {
  //   if (acc.hasOwnProperty(current.type)) {
  //     acc[current.type].push(current);
  //   } else {
  //     acc[current.type] = [];
  //     acc[current.type].push(current);
  //   }
  //   return acc;
  // })
  // console.log(reduced);
}
// getUser('lilyx13');

const filterItem = item => {
  const eventTime = Math.floor(new Date(item.created_at).getTime() / 1000)
  console.log(item.type);
  return item.type === 'PushEvent' && eventTime > oneWeekAgo
}

const getUsers = async () => {
  const data = await Promise.all(
    [
      octokit.request(`GET /users/lilyx13/events?per_page=100`, {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      }),
      octokit.request(`GET /users/acidtone/events?per_page=100`, {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      }),
      octokit.request(`GET /users/jzackspringchief/events?per_page=100`, {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      }) 
    ]
    
    
    );
    const filteredUsers = [];
    data.forEach((item) => {
      console.log(item.data.length);
      filteredUsers.push(item.data.filter(filterItem).length);
    })
    // const acc = {};
    // data.reduce((acc, current) => {
    //   if (acc.hasOwnProperty(current.actor.login)) {
    //     acc[current.actor.login]++;
    //   } else {
    //     acc[current.actor.login] = 0;
    //     acc[current.actor.login]++;
    //   }
    //   return acc;
    // })
    console.log(filteredUsers);
}

getUsers();


// todo set up endpoint and middle ware later

// repo commit status?

// octokit.rest.repos.getCommit({
//   owner,
//   repo,
//   ref,
// });

// octokit.rest.repos
//   .createForAuthenticatedUser({
//     name: "API TEST",
//   })
//   .then((response) => console.log("repo has been created"));

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
