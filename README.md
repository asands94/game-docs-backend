# GameDocs API

This api will allow the users of our react front-end application to CRUD games and their ideas.

This application uses token authentication.

## Resources

### Games

###### Routes Table

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET   | `/games`             | `games#index`    |
| GET   | `/games/:id`             | `games#show`    |
| POST   | `/games`             | `games#create`    |
| PATCH  | `/games/:id` | `games#update`  |
| DELETE | `/games/:id`        | `games#delete`   |

### Users

###### Routes Table

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/sign-out/`        | `users#signout`   |

### Ideas

###### Routes Table

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/ideas/:gameId`             | `ideas#create`    |
| PATCH  | `/ideas/:gameId/:ideaId` | `ideas#update`  |
| DELETE | `/ideas/:gameId/:ideaId`        | `ideas#delete`   |