# Architecture and tree structure

```mermaid
---
title: Architecture - Application
---
flowchart LR
    c[communikit.nl]
    ac[fa:fa-lock admin.communikit.nl]
    dc[docs.communikit.nl]
    main[github/main]

    main -- apps/web --> c/build
    main -- apps/admin --> ac/build
    main -- apps/docs --> dc/build

    subgraph vercel
      subgraph communikit.nl
        c
        c/build[build]
        c/edge[edge]
      end

      subgraph admin.communikit.nl
        ac
        ac/build[build]
        ac/edge[edge]
      end

      subgraph docs.communikit.nl
        dc
        dc/build[build]
      end
    end

    c --> c/build
    ac --> ac/build
    dc --> dc/build
    
    subgraph planetscale
      db[(DB)]
    end

    main -- drizzle-orm for migrations --> db[(MySQL)]

    c -- packages/tRPC --> c/edge
    ac -- packages/tRPC --> ac/edge

    c/edge -- drizzle-orm --> db
    ac/edge -- drizzle-orm --> db
```

```mermaid
---
title: Session provider and AuthGuard - admin.communikit.nl
---
stateDiagram-v2
  classDef rendered fill:#ACE5AC,stroke:#008500,color:#008500

  state SessionProvider {
    state AuthGuard {
      state isAuthenticated <<choice>>
      sessionStatus --> isAuthenticated
      isAuthenticated --> Layout : Authenticated
      isAuthenticated --> LoginPage : Not authenticated
    }
  }

  note right of SessionProvider
    Provides children with information about:
    - If an user is authenticated
    - Session details about the user that is authenticated
  end note

  class Layout rendered
  class LoginPage rendered
```

```mermaid
---
title: Layout - admin.communikit.nl
---
stateDiagram-v2
  classDef rendered fill:#ACE5AC,stroke:#008500,color:#008500

  state Layout {
    state Navbar {
      NavigationItems
      Profile
    }

    children
  }

  class NavigationItems rendered
  class Profile rendered
  class children rendered
```