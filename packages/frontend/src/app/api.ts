import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

type Pokemon = {
  species: {
    name: string;
  };
  sprites: {
    front_shiny: string;
  };
};

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name.toLowerCase()}`,
    }),
  }),
});

export type ApiError = FetchBaseQueryError | SerializedError;

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi;
