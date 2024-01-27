# Hospitality PMS

The primary aim of this project as indicated by a majority of its participants is to gain expertise in their respective fields and to have experience building a project all the way from the conception of an idea to a working solution that provides value to users of the application, individuals involved in the hospitality industry. The primary features of the application are as follows User/Core Entity Management, Booking & Reservation Management, Ordering Service, Payment Service and Reports & Analytics. Additional features include Room Management, Multi-language support, Customer Chat Service, Map View, and Intuitive Search & Filter. The deployed application can be found [here](/).

## Table of Contents

- [Title](#hospitality-pms)
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

The primary value proposed by this project is to provide a platform for the hospitality industry to manage their business operations. The app is equipped with a couple of features which are listed in the [Features](#features) section. In addition to running the application, the app can also be tested, this is covered in details in the [Testing](#testing) section.

## Features

The app is currently equipped with the following features:

- User Authentication: The user should be able to login into the application, and should be prevented from accessing pages that require authentication. The user is also capable of logging out from the User dropdown located on the top left corner.
- Core Entity Management: The app should be able to manage users, rooms, and bookings. The app should be able to update user information, room information, and booking information.
- Booking & Reservation Management: The app should be able to manage bookings and reservations. The app should be able to create, read, update, and delete bookings and reservations.
- Ordering Service: The app should be able to manage orders. The app should be able to create, read, update, and delete orders.
- Payment Service: The app should be able to manage payments. The app should be able to create, read, update, and delete payments.
- Reports & Analytics: The app should be able to generate reports and analytics. The app should be able to generate reports and analytics.

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

The application documentation is available on the [Hospitality PMS documentation](https://carnation-bladder-b2b.notion.site/Hospitality-PMS-8a2226acd72a43bb97eee7f13ffc7b40). It should be noted that the source code is also documentated via docstring comments and typescript type definitions.
