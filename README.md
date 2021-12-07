# Add Repo Owner Action

This action will add a valid GitHub user as the repository owner.

## Inputs:

`repo-name`: Name of the repository

`org-admin-token`: Org admin token with `repo` and `admin:org` scope

`new-owner`: Handle of the new user


## Demo Workflow:

### Secrets needed:

Create a Personal Access Token with relevant scopes and save it as a Repo Secret - `ORG_ADMIN_TOKEN`

```
name: Create Repo
on: 
  workflow_dispatch:
    inputs:
      repo-name: 
        description: 'Name of the repository to be created'
        required: true
        default: ''

jobs:
  create-repository:
    runs-on: ubuntu-latest
    name: Creating Organization Repository
    steps:
      - name: Use Node.js
        uses: actions/setup-node@v2
      - name: Add the user who ran this workflow as Repo Admin
        uses: rohitnb/add-repo-owner-action@main
        id: add-owner
        with:
          repo-name: '${{ github.event.inputs.repo-name }}'
          org-admin-token: '${{ secrets.ORG_CONTROLLER }}'
          new-owner: '${{ github.actor }}'
```
