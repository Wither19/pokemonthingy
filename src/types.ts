export type PokeAPIObject = {
	id: number;
	name: string;
	sprite_default: string;
	sprite_shiny: string;
};

export type APIResult = PokeAPIObject | null;

export type PkmnId = number | string;

export type ShinyBoostAmount = number;
