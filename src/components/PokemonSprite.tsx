// Pass a (randomly-generated) Pokemon's name as a prop for this component
function PokemonSprite(props: any) {
	return (
		<>
			<img src={props.image} />
		</>
	);
}

export { PokemonSprite };
