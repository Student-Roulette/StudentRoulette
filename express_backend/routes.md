
## Routes

(I wrote `DEL` instead of `DELETE` because `DELETE` is 6 characters.)

`/tags/`
- GET  `/list`            > return all tags
- GET  `/relations/`      > parents and children (for specific tag)
- POST `/new`
`/events/`                > `start` and `end` (optional) should be handled internally on *all* queries.
- DEL  `/:id/`
- GET  `/:id`             > event details
- GET  `/group`           > events by groups (just `id`s?)
- GET  `/ongoing`         > just a fun one
- GET  `/tag/:tag`        > return events affiliated with a single tag
- POST `/new/`
- PUT  `/:id`             > updates maybe?
`/groups/`
- DEL  `/:id/`
- GET  `/members/:id`
- GET  `/logo/:id`
- GET  `/verified/:id`
- POST `/new`
- PUT  `/update/:id`
- PUT  `/join/:id`
`/users/`
- GET  `/banned/:id`
- GET  `/groups/:id`
- GET  `/events/:id`      > events created by user with given `id` (admin)
- GET  `/founded/:id`     > groups created by user with given `id` (admin)
- POST `/signup/`         > *not* to be confused with auth, write email+ to DB.
`/auth/` 
- ???
- Google OAuth2 authentication

## Future

- User internal routes (account data)?
- What local auth will be needed?

POST for new items
PUT replaces in entirety (idempotent)
PATCH for updates (not idempotent!)
DELETE for ... guess
