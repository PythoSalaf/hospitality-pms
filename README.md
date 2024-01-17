# Lendsqr Finance

This application helps you manage your lending and borrowing activities. The deployed application can be found on [lendsqr.finance](https://lendsqr.finance).

## Table of Contents

- [Lendsqr Finance](#lendsqr-finance)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running App Locally](#running-app-locally)
    - [Testing](#testing)
      - [Unit and Integration Tests](#unit-and-integration-tests)
      - [End to End Tests](#end-to-end-tests)
    - [Building and Deploying](#building-and-deploying)
  - [Documentation](#documentation)

## Introduction

The primary purpose of this project is to help you manage your lending and borrowing activities. The app is equipped with a couple of features which are listed in the [Features](#features) section. In addition to running the application, the app can also be tested, this is covered in details in the [Testing](#testing) section.

## Features

The app is currently equipped with the following features:

- User Authentication: The user should be able to login/register into the application, and should be prevented from accessing pages that require authentication. The user is also capable of logging out from the User dropdown located on the top left corner.
- User Management: The user is expected to have access to a dashboard that displays user data and also a general analytics on the user. The user data is displayed in a table and is paginated. However, the size of the data available for view and the current page can be controlled at the user’s discretion. The user is also able to perform the following actions;
  - View User Details: This possible by either clicking on the user’s name or clicking on `view details` on actions column dropdown menu
  - Blacklist User: The authenticated user can also blacklist a user, provided the user isn’t already blacklisted. A user can be blacklisted from the actions dropdown menu or on the user details page via the `blacklist` btn
  - Activate User: The authenticated user can also activate a user, provided the user isn’t already activated. A user can be activated from the actions dropdown menu or on the user details page via the `activate` btn
  - Filter Users: The authenticated user is also capable of filtering user’s data via the filter button conveniently located beside each column on the user table. It should be noted that when a particular filter is being applied the column that indicates that filter will be highlighted.

## Getting Started

The application is a next project and uses version 14 in particular, it makes use of the App router and the Prisma ORM for application routing and database management respectively.

### Prerequisites

You'll need the following to be able to run the application, or to work on the application.

- Node.js version 14 or higher
- Node package manager (Yarn, pnpm or npm)
- A stable internet connection
- A modern browser such as Chrome, Firefox, or Edge
- Database (PostgreSQL or SQL)
- Text editor such as VSCode or Sublime

### Installation

You'll need to do the following to install the project.

- Installs the dependencies of the project using the following command
  ```bash
   npm install # using npm
   yarn install # using yarn
  ```
- Create a database either via Postgres or SQL
- Create a .env in the root of the app's folder
  ```bash
  cp .env.example .env   # will create a .env file by copying .env.example
  ```
- You can then fill out the details in the .env file like the DATABASE_URL
- Once the .env variables are populated, especially the DATABASE_URL, run the following command
  ```bash
  yarn db-migrate-dev # will run the db migrations to populate the database
  npm run db-migrate-dev # using npm
  ```

### Running App Locally

You can proceed to run the application after completing the steps in the [Installation](#installation), by running the following command

```bash
npm run dev # using npm
yarn dev # using yarn
```

This will open the application in the browser on `localhost:3000`

### Testing

Tests are divided into two parts, unit/integration tests and end-to-end tests.

- #### Unit and Integration Tests
  These are tests that ensure that unit of the application work as expected independently(unit) and together(integration). To run these tests, run the following command
  ```bash
  npm run test:unit # using npm
  yarn test:unit # using yarn
  ```
- #### End to End Tests
  These tests ensure that the app delivers the intended experience to its users. To run these tests, run the following command
  ```bash
  npm run test:e2e # using npm
  yarn test:e2e # using yarn
  ```

### Building and Deploying

The app can either be built locally and the build folder deployed or deployed using the source code on a platform like vercel with CI/CD setup. To build the app for production, run the following command

```bash
npm run build # using npm
yarn build # using yarn
```

## Documentation

The application documentation is available on the [Lendqr documentation](https://carnation-bladder-b2b.notion.site/Lendsqr-Assessment-2be98206dfbd4b128b118d8516e26e2f?pvs=4). It should be noted that the source code is also documentated via docstring comments.
