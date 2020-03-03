# Code Climate Connector Scaffolding

Create a new Code Climate Connector

## Getting Started

### Create your Connector package

#### Yarn

`yarn create codeclimate-connector <connector-slug>`

#### npx

`npx create-codeclimate-connector <connector-slug>`

### Implementing

Running one of the above commands will create a project in the directory
`codeclimate-connector-<connector-slug>`. The project will be setup with some
scaffolding and stubbed unit tests, and is setup to use TypeScript.

To start implementing logic, take a look at the created `src/Client.ts` in your
project. You can also refer to the created `README.md` for some suggestions on
how to proceed.
