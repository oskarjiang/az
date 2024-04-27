# az

## TODO:

- [x] Sorting for getByType
- [] Include evolutions for getById. Recursive (?)
- [] Min. three characters for getByName
- [] Fuzzy matching for getByName
- [] Endpoint for adding
- [] Database insertion/setup
- [] Documentation in README
- [] Domain types (?)

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
  - [] The endpoint should accept a string parameter with a minimum length of three.
  - [x] The parameter should expect the name of a pokémon.
  - [] Matching the name should be fuzzy.
- Create an API endpoint that returns a suggested pokémon.
  - [x] It should accept a pokémon as a parameter.
  - [x] It should return a pokémon that has a type that the provided pokémon is weak against. The returned pokémon should not be weak vs. the provided
        pokémon.
- Create an API endpoint to add a pokémon to the database.
  - [] It should accept a pokémon as a parameter.
  - [] It should be possible to add a pokémon as the next or previous evolution of a already existing pokémon in the database.

## Nice to have:

- [] Unit tests
- [] Param validation (express-validator)
- [] Docker
- [] React app/Swagger
