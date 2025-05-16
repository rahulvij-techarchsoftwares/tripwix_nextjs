# TRIPWIX Web App

![TRIPWIX](./public/assets/logo.svg)

Web app for AWE&SOME

## Technical info

- **project owners**: Teresa Lemos
- **code reviewers**:
    - Miguel Nunez (@miguelnunez, front-end)
    - Denis Encarnação (@denisae, back-end)
- **environments**:
    - development: <https://staging-front.awesome.dengun.net/>
        - branch: `develop`
    - staging: <https://staging-front.awesome.dengun.net/>
        - branch: `staging`
    - production: <https://staging-front.awesome.dengun.net/>
- **stack**: [React web app with Api](https://sites.google.com/dengun.com/playbook/code-and-development/project-stacks/react-web-app-with-api)
- **related URLs**:
    - [Staging Backoffice](https://staging-admin.awesome.dengun.net/admin/)
    - [Staging API](https://staging-api.awesome.dengun.net/api/swagger/)

## Get Started

### Prerequisites

**_node 20.x +_**&nbsp; and **_npm_**.

### Install and Run project

Project can be run with Node.js (recommended for web app development)
To **run the project**:

1. Clone the repo
2. Install project:

   ```bash
   npm install
   ```

3. run app:

   ```bash
   npm run dev
   ```

The project will be available in <http://localhost:3000> and <http://127.0.0.1:3000>, and in your local IP at port 3000.

#### About developer tools

We had some tools configured in the project, that you can use in **_development_** mode. You can read more about each one in their official documentations.

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

### Start a Feature, Fix, or Chore

1. Create a new branch from remote's develop branch:

   ```bash
   # sync remote branches first
   git fetch --prune
   # <BRANCH_NAME> = intended branch name
   git checkout -b <BRANCH_NAME> origin/develop
   ```

2. Run `npm install` to update dependencies;
3. Work on your feature;
4. Commit changes;
5. Push changes to remote branch with same name;
6. Create merge request into `develop`.

## Build

### Build (Production)

```bash
npm run build
```

### Build (Locally)

```bash
npm run build
```

### Build (Staging)

```bash
npm run build
```

## Release and Deployment

**Deployments are automated** (via CI/CD) per release to:

- staging: `staging` branch
- production: `master` branch

### Commintlint for commit messages

#### Here are some examples of valid commit messages:

fix: correct minor typos in code
feat: add new feature
chore: add Oyster build script

#### Here are some examples of invalid commit messages:

fix minor typos in code
foo: add new feature
chore; add Oyster build script
feat: Add new feature

#### Commitlint Docs

https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional

#### Commitlint validator

https://commitlint.io/