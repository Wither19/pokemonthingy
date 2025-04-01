export type PokeAPIObject = {
	id: number;
	name: string;
	catch_rate: number;
	sprite_default: string;
	sprite_shiny: string;
};

export type APIResult = PokeAPIObject | null;

export type PkmnId = number | string;

