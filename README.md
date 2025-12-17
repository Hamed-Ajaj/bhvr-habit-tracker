# bhvr - Habit Tracker

## Project Overview

This is a full-stack TypeScript monorepo for a habit tracking application called "bhvr". It's built with a modern stack, including:

*   **Monorepo:** [Turborepo](https://turbo.build/) for build orchestration.
*   **Backend:** [Hono](https://hono.dev/) a lightweight web framework, running on [Bun](https://bun.sh/).
*   **Frontend:** [React](https://react.dev/) with [Vite](https://vitejs.dev/) for bundling.
*   **Database:** The database is not explicitly defined in the project, but the server code has placeholders for a database connection. The project uses `better-auth` which suggests a SQL database.
*   **Authentication:** [better-auth](https://github.com/brault-j/better-auth) is used for authentication.
*   **UI:** The frontend uses [shadcn/ui](https://ui.shadcn.com/) and [Tailwind CSS](https://tailwindcss.com/).
*   **Shared Code:** There is a `shared` workspace for code that is used by both the client and the server.

The project is structured as a monorepo with three workspaces:

*   `client/`: The React frontend.
*   `server/`: The Hono backend.
*   `shared/`: Shared TypeScript definitions.

## Building and Running

### Installation

To install the dependencies for all workspaces, run the following command from the root of the project:

```bash
bun install
```

### Development

To run all workspaces in development mode, run the following command from the root of the project:

```bash
bun run dev
```

You can also run individual workspaces:

*   **Client:** `bun run dev:client`
*   **Server:** `bun run dev:server`

### Building

To build all workspaces, run the following command from the root of the project:

```bash
bun run build
```

You can also build individual workspaces:

*   **Client:** `bun run build:client`
*   **Server:** `bun run build:server`

### Running in Production

To run the server in production, you first need to build the project. Then you can run the following command:

```bash
bun run start
```

## Development Conventions

*   **Code Style:** The project uses ESLint for linting. The configuration can be found in `client/eslint.config.js`.
*   **Type Checking:** The project uses TypeScript for static type checking. You can run the type checker with `bun run type-check`.
*   **Testing:** The project is set up for testing, but there are no tests yet. You can run the tests with `bun run test`.
*   **Commits:** There is no specific commit message format enforced, but the project uses `git` for version control.