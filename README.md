# @blerp/web

The Progressive Web App frontend for Blerp, built with [React](https://reactjs.org/) and [next.js](https://github.com/zeit/next.js/).

Use withLogging for tracking

## Getting Started

Project is managed with npm.

```
$ npm install
```

This installs all production and development dependencies needed to work with this codebase locally.

## Developing

After installing all dependencies do a `npm run build`
To have hot loading enabled first run `npm run dev`

We use the sw-precache-webpack-plugin to create a service worker to cache things heavily on the frontend
`npm run start` will start the app in production mode `.dist/server.js`

### Develop in packs

New pages are created in the `pages folder`

We want to make component specific to pages within a single pack in the `packs/page` folder

When we delete a page we should be able to safe delete the whole `pack` related to the page

### Before committing run prettier, stylelint, and jest

Use VS code with ESLint dbaeumer.vscode-eslint Dirk Baeumer when running this project. Prettier should be configured on save.

All styles and styled components should be run through stylelint

Example: `npx stylelint src/components/buttons/rectangle-text-button.js`

Jest command runs all projects defined in package.json `jest-[runners].config.js` on all files

`npm run jest`

## Deploying (Server)

Don't run ./deploy.sh install directive on your local computer. I haven't tested it yet, but even still it's for setting npm + yarn on a completely fresh debian install.
./deploy.sh
./deploy.sh run
./deploy.sh stop
./deploy.sh clean
are all safe

## Deploying (Serverless)

We deploy to google serverless functions for all the routing. Essentially the serveApp function in server.ts is what gets hit in lambda.
It starts up next.js and the routing is configured for the pages. Our frontend website is hosted mainly on firebase. Firebase links all the functions to the right spots. The `firebase.json` file is what defines blerps cloud function mappings. To change the routing you will need to run `firebase deploy --project blerp-staging-ac0d7 --token $FIREBASE_TOKEN`.

### Staging (Serverless)

npm install -g serverless

Get a JSON service key file from and a on admin google cloud. Copy the file to `~/.gcloud/blerp-keyfile.json`. Go to the `src/config/project` file and change the export variable to `projectConfig.staging`. Run `yarn:deploy:staging`. Wait for the magic to happen. Access the endpoint at the host url listed in the project config for the deployed environment.

### Production (Serverless)

npm install -g serverless

Get a JSON service key file from and a on admin google cloud. Copy the file to `~/.gcloud/blerp-keyfile.json`. Go to the `src/config/project` file and change the export variable to `projectConfig.production`. Run `yarn:deploy:production`. Wait for the magic to happen. Access the endpoint at the host url listed in the project config for the deployed environment.

### Built With

-   [React](https://reactjs.org/)
-   [next.js](https://github.com/zeit/next.js/)
-   [TypeScript](http://www.typescriptlang.org/)
-   [GraphQL](http://graphql.org/)

### Prerequisites

[Node.js](https://nodejs.org/) is the only required prerequisite for working with this codebase. [Yarn](https://yarnpkg.com/) is reccomeneded.

### Building

Building is handled using [`webpack`](https://webpack.js.org/) - as [configured in this repo](https://gitlab.com/lolibe/blerp/web/blob/master/webpack.config.js) - and [`serverless-webpack`](https://github.com/serverless-heaven/serverless-webpack).

### Continuous Integration

Deploying is best handled by the CI - as defined in this repo's [`.gitlab-ci.yml`](https://gitlab.com/lolibe/blerp/web/blob/master/.gitlab-ci.yml).

## Style Guide

## API Reference

This project uses the centralized Blerp API located at https://api.blerp.com. Documentation for this can be found in the the [`@blerp/api`](https://gitlab.com/blerp/api) repo.

## LICENSE

This project is proprietary and closed source. All Rights Reserved to Blerp Inc.

## Image Hosting

Images not related to bites. Images can be served from the static folder. However we host most of our images from https://console.cloud.google.com/storage/browser/blerp-web-images/static/?project=blerp-cf7ae in order to minimize load time.

## Styling setup using styled scomponents

Using styled components we had to setup thishttps://bilalbudhani.com/using-next-js-with-styled-components/ and this /_ https://www.styled-components.com/docs/tooling#serverside-rendering _/
