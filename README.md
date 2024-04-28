# az

# Documentation

- I chose to do Fuzzy search using external library since this isn't supported in the free version in MongoDB
- Architecture is Clean Architecture but with a functional approach
- With more time perhaps domain types would be preferable rather than using the Document type all over the palce

## Requirements

- Load the JSON dataset into a database of your choice.
  - [x] The database should be used by all endpoints.
- Create an API endpoint that gets a pokémon by its ID.
  - [x] It should return next and previous evolutions as well.
  - [x] If its next or previous evolutions have further evolutions, those should be included as well.
- Create an API endpoint that filters Pokémon by type.
  - [x] The endpoint should accept a type as a parameter and return all Pokémon of that type.
  - [x] It should accept sorting as a parameter. Should be able to sort on most properties (for example weight).
- Create an API endpoint that searches for a pokémon by name.
  - [x] The endpoint should accept a string parameter with a minimum length of three.
  - [x] The parameter should expect the name of a pokémon.
  - [x] Matching the name should be fuzzy.
- Create an API endpoint that returns a suggested pokémon.
  - [x] It should accept a pokémon as a parameter.
  - [x] It should return a pokémon that has a type that the provided pokémon is weak against. The returned pokémon should not be weak vs. the provided
        pokémon.
- Create an API endpoint to add a pokémon to the database.
  - [x] It should accept a pokémon as a parameter.
  - [x] It should be possible to add a pokémon as the next or previous evolution of a already existing pokémon in the database.

## Nice to have:

- [x] Validate parameters to API endpoints
- [] Unit tests
- [] Dockerize application
- [x] Client to consume the API (React, swagger, etc)
