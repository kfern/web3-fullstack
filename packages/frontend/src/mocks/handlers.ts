// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.get("https://pokeapi.co/api/v2/pokemon/unknown", (req, res, ctx) => {
    return res(
      // Send a valid HTTP status code
      ctx.status(404),
      // And a response body, if necessary
      ctx.text("Not Found")
    );
  }),
  /*
  rest.get("https://pokeapi.co/api/v2/pokemon/pikachu", (req, res, ctx) => {
    const pikachu = {
      species: {
        name: "pickachu",
      },
      sprites: {
        front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png",
      },
    };

    return res(
      // Send a valid HTTP status code
      ctx.status(200),
      // And a response body, if necessary
      ctx.json(pikachu)
    );
  }),
*/
];
