const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const targetRepoName = core.getInput('repo-name');
const ghToken = core.getInput('org-admin-token');
const newOwner = core.getInput('new-owner');
var addOwnerData = JSON.stringify(
  {
    "permission": "admin"
  }
);
const targetOrgName = github.context.payload.repository.owner.login;

var config = {
  method: 'put',
  url: 'https://api.github.com/repos/'+targetOrgName+'/'+targetRepoName+'/collaborators/'+newOwner,
  headers: { 
    'Accept': 'application/vnd.github.v3+json', 
    'Authorization': 'token '+ghToken, 
    'Content-Type': 'application/json'
  },
  data : addOwnerData
};

axios(config)
.then(function (response) {
  console.log("User "+newOwner+' add as owner successfully!');
})
.catch(function (error) {
  core.setFailed(error.message);
});