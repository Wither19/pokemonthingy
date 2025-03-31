import { useEffect, useState } from "react";
import axios from "axios";

import "./App.scss";

import { PokemonSprite } from "./components/PokemonSprite";

import type {
	PokeAPIObject,
	APIResult,
	PkmnId,
	ShinyBoostAmount,
} from "./types";

import { ShinyBoostType } from "./enums";

/**
 * Returns a stripped down PokeAPI object.
 * @param pokemon {PkmnId} If a string, fetches using the Pokemon's name, if a number, fetches by it's National Pokedex number.
 * @returns {APIResult}
 */
const pokemonFetch = (
	pokemon: PkmnId = Math.random() * 1025 + 1
): APIResult => {
	var apiFindings: APIResult = null;
	axios
		.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
		.then((res) => {
			apiFindings = {
				id: res.data.id,
				name: res.data.name,
				sprite_default: res.data.sprites["front_default"],
				sprite_shiny: res.data.sprites["front_shiny"],
			} as PokeAPIObject;
		})
		.catch(() => {
			console.log("Could not find Pokemon!");
		});
	return apiFindings;
};

const getShinyOdds = (
	pokemon: string,
	boost?: ShinyBoostType,
	boostAmount?: ShinyBoostAmount
): boolean => {
	const baseOdds: number = 4096;
	let finalOdds: number = baseOdds;
	if (boost) {
		if (boostAmount) {
			if (boost == 1) {
				finalOdds = boostAmount;
			} else if (boost == 2) {
				finalOdds /= boostAmount;
			}
		}
	}
	let shinyRoll = Math.random() * finalOdds + 1;
	let isShiny: boolean = false;
	if (shinyRoll == 1) {
		isShiny = true;
	}
	return isShiny;
};

function App() {
	const [pkmn, setPkmn] = useState<APIResult>(pokemonFetch("eevee"));
	const [shinyOdds, setShinyOdds] = useState<boolean>(getShinyOdds("eevee"));

	const changePokemon = (pokemon: PkmnId = Math.random() * 1025 + 1) => {
		setPkmn(pokemonFetch(pokemon));
		setShinyOdds(getShinyOdds(pokemon.toString()));
	};

	return (
		<>
			<PokemonSprite
				image={shinyOdds ? pkmn?.sprite_shiny : pkmn?.sprite_default}
			/>
			<button
				onClick={() => {
					changePokemon();
				}}></button>
		</>
	);
}

export default App;
