const domain = 'https://pokeapi.co/api/v2';
const endpoint = 'pokemon';

async function getPokemonNames(pokemonID) {
	const start_time = new Date().valueOf();
	const pokemonName = [];
	for (let i = 0; i < pokemonID.length; i++) {
		if (Date.now() - start_time > 2000) {
			throw new Error('This works must be done in less than 2 seconds');
		}
		pokemonName.push(await getPokemon(`${domain}/${endpoint}/${pokemonID[i]}`));
	}
	return pokemonName;
}

async function getPokemonNamesB(pokemonID) {
	let pokemonNames = [];
	let url = '';
	let pokemon = null;
	let pokemonName = '';
	pokemonNames = pokemonID.map(async (id) => {
		url = `${domain}/${endpoint}/${id}`;
		pokemon = await fetch(url);
		pokemonName = await pokemon.json();
		return pokemonName.name;
	});
	if (pokemonNames.length === 0) {
		throw new Error('No pokemon found');
	}
	const result = await Promise.all(pokemonNames);
	return result;
}


function main() {
	const pokemonId = [];
	for (let i = 0; i < 10; i++) {
		// random and push
		// pokemon id is between 0 and 600
		pokemonId.push(Math.floor(Math.random() * 600));
	}
	console.time('Operation');
	// getPokemonNames(pokemonId).then((pokemons) => {
	// 	console.dir(pokemons);
	// 	console.timeLog('Operation');
	// });
    console.log('Toi uu')
    getPokemonNamesB(pokemonId).then((pokemons) => {
		console.dir(pokemons);
		console.timeLog('Operation');
	});
}

async function getPokemon(url) {
	// coding here
	try {
		const response = await fetch(url);
		if (response.status === 200) {
			const data = await response.json();
			return data.name;
		}
	} catch (e) {
		throw new Error('Error in fetching data');
	}
}

console.log('cau 7')
main();

// Ex6
/*insertAdjacentHTML(position, html) là phương thức giúp chúng ta chèn code HTML vào một vị trí chỉ định trong DOM.
phương thức này nhận vào 2 tham số chính là vị trí và code HTML.
ví dụ: node.insertAdjacentHTML('beforebegin', '<h1>Hello</h1>');
*/
// Giải:

const render = (event) => {
	const animal = document.querySelector('#animal');
	if (animal) {
		animal?.parentNode.removeChild(animal);
		return;
	}
	const name = event.target.dataset?.animal;
	if (name) {
		const selector = document.querySelector('#container');
		selector &&
			selector.insertAdjacentHTML(
				'afterend',
				`<h1 style="textAlign: center" id="animal">${name}</h1>`
			);
	}
};

const node = document.querySelector('#container');
let animals = ['cat', 'rabbit', 'dog', 'fox', 'fish', 'racoon', 'tiger', 'bear', 'parrot', 'snake'];
const html = animals
	.map(
		(animal) =>
			`<button style="margin:20px" data-animal="${animal}" onClick="render(event)">${animal}</button>`
	)
	.join('');

node && node.insertAdjacentHTML('beforebegin', html);