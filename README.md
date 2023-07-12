# advo-kit

Digital decks

## Prerequisites

- [Node](https://nodejs.org) (version specified in [.nvmrc](./.nvmrc))
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)

## What's inside?

This project includes the following packages/apps:

### Apps and Packages

- `admin`: React application that serves as the admin UI
- `api`: API that serves both the `admin` and `web` applications and their APIs
- `web`: A React application that is the client for browser

### Utilities

- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd advo-kit
pnpm build
```

### Develop

A certificate is required to run the project. Generate one with [`mkcert`](https://github.com/FiloSottile/mkcert). Make sure to be in the root of the project when generating so the certificates will be placed there. To develop all apps and packages, run the following command:

```
cd advo-kit
pnpm dev
```

This will run `web`, `admin` and `api` locally. You can access them by the URLs they print in your terminal.

## Useful Links

pnpm:

- [Using Workspaces](https://pnpm.io/workspaces)
- [Installing all dependencies](https://pnpm.io/cli/install)
- [Adding dependecies](https://pnpm.io/cli/add)
- [Removing dependencies](https://pnpm.io/cli/remove)

Turbo repo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
