const pokemonName = document.querySelector('.pokemon-name');
const pokemonId = document.querySelector('.pokemon-id');
const pokemonImage = document.querySelector('.pokemon-image');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');

const buttonPrevious = document.querySelector('.button-previous');
const buttonNext = document.querySelector('.button-next');

let searchedPokemon = 389;

const fetchPokemon = async (pokemon) =>
{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200)
    {
        const pokemonData = await APIResponse.json();
        return pokemonData;
    }
}

const renderPokemon = async (pokemon) =>
{
    pokemonName.innerHTML = 'Loading...';
    pokemonId.innerHTML = '';

    const pokemonData = await fetchPokemon(pokemon);

    if(pokemonData)
    {
        pokemonImage.style.display = 'block';

        pokemonName.innerHTML = pokemonData.name;
        pokemonId.innerHTML = pokemonData.id;
        pokemonImage.src = pokemonData['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    
        input.value = '';
        searchedPokemon = pokemonData.id;
    }
    else
    {
        pokemonName.innerHTML = 'Not found :C';
        pokemonId.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
}

form.addEventListener('submit', (event) =>
{
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

buttonPrevious.addEventListener('click', () =>
{
    if(searchedPokemon > 1)
    {
        searchedPokemon -= 1;
        renderPokemon(searchedPokemon);
    }
});

buttonNext.addEventListener('click', () =>
{
    if(searchedPokemon < 649)
    {
        searchedPokemon += 1;
        renderPokemon(searchedPokemon);
    }
});

renderPokemon(searchedPokemon);