# advo-kit

Digital decks

## Prerequisites

- [Node](https://nodejs.org) (version specified in [.nvmrc](./.nvmrc))
- [pnpm](https://pnpm.io/)

## What's inside?

This project includes the following packages/apps:

### Apps and Packages

- `web`: A React application that is the client for browser
- `admin`: A Next.js application that serves as an admin interface
- `trpc`: Used to consolidate the API
- `db`: Drizzle ORM that connects to Planetscale

### Utilities

- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd advo-kit
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd advo-kit
pnpm dev
```

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
