import { useState } from "react";
import axios from "axios";

import "./App.scss";

const dashOrUnderscore = new RegExp("([_-])+");

import type {
	APIResult,
	PkmnId
} from "./types";

import { BoostType } from "./enums";


const getShinyOdds = (
	boost?: BoostType,
	amount?: number
): boolean => {
	const baseOdds: number = 4096;
	let finalOdds: number = baseOdds;
	if (boost) {
		if (amount) {
			if (boost == 1) {
				finalOdds = amount;
			} else if (boost == 2) {
				finalOdds /= amount;
			}
		}
	}
	const shinyRoll = Math.random() * finalOdds + 1;
	let isShiny: boolean = false;
	if (shinyRoll == 1) {
		isShiny = true;
	}
	return isShiny;
};

const caps = (text: string): string => {
	let modifiedText: string = text;
	if (dashOrUnderscore.test(text)) {
		modifiedText = text.replace(dashOrUnderscore, " ");
	}
	modifiedText = modifiedText.charAt(0).toUpperCase() + modifiedText.slice(1);
	return modifiedText;
};

const adjust = (rate: number | undefined) => {
	if (typeof rate == "number") {
	rate = rate / 2.55;
	return Math.round(rate);
	}
	return NaN;
};

const catchRateCalc = (rate: number | undefined) => {
	if (typeof rate == "number") {
		rate = rate / 1.12;
	}
};

function App() {
	const [pkmn, setPkmn] = useState<APIResult>({
		id: 133, 
		name: "eevee",
		catch_rate: 45,
		sprite_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",
		sprite_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/133.png"
});
	const [shinyOdds, setShinyOdds] = useState<boolean>(getShinyOdds());

	const pokemonFetch = async(
	pokemon: PkmnId = Math.floor(Math.random() * 1025 + 1)
) => {
	const pokemonObj = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
	const speciesObj = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);

	const p = pokemonObj.data;
	const s = speciesObj.data;

	if (p && s) {
		setPkmn({
		id: p.id,
		name: p.name,
		catch_rate: s.capture_rate,
		sprite_default: p.sprites["front_default"],
		sprite_shiny: p.sprites["front_shiny"]
	});
	}
	// alert("Pokemon not found!");
};

	const changePokemon = (pokemon: PkmnId = Math.floor(Math.random() * 1025 + 1)) => {
		pokemonFetch(pokemon);
		setShinyOdds(getShinyOdds());
	};

	return (
		<>
	<div style={{textAlign: "center"}}>
		<h1>{pkmn ? caps(pkmn.name) : "sample text"}</h1>
		<b>Catch Rate: {adjust(pkmn?.catch_rate)}%</b>
		<img src={shinyOdds ? pkmn?.sprite_shiny : pkmn?.sprite_default} alt="" />
			<button
				onClick={() => {
					changePokemon();
				}}>Randomize</button>
	</div>
		</>			
	);
}

export default App;
