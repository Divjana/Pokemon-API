const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
const pokemonWrapper = document.querySelector('#pokemonWrapper');
const fetchCta = document.querySelector('#fetchCta');
const maxPokemonCount = 50;

fetchCta.addEventListener('click', async () => {
  await fetchRandomPokemon();
});

const fetchRandomPokemon = async () => {
  try {
    const randomId = getRandomPokemonId(maxPokemonCount);
    const response = await fetch(baseUrl + randomId);
    const data = await response.json();
    displayPokemon(data);
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
};

const displayPokemon = (data) => {
  const pokemonDiv = document.createElement('div');
  pokemonDiv.classList.add('pokemonInfo');


  const image = document.createElement('img');
  image.src = data.sprites.front_default;
  image.alt = data.name;

  const nameHeader = document.createElement('h2');
  nameHeader.textContent = data.name;

  const abilitiesHeader = document.createElement('h3');
  abilitiesHeader.textContent = 'Abilities:       ';

  const abilitiesList = document.createElement('ul');
  data.abilities.forEach((ability) => {
    const abilityItem = document.createElement('li');
    abilityItem.textContent = ability.ability.name;
    abilitiesList.appendChild(abilityItem);
  });


  
  pokemonDiv.appendChild(image);
  pokemonDiv.appendChild(nameHeader);
  pokemonDiv.appendChild(abilitiesHeader);
  pokemonDiv.appendChild(abilitiesList);


  pokemonWrapper.innerHTML = '';
  pokemonWrapper.appendChild(pokemonDiv);
};

const getRandomPokemonId = (maxCount) => {
  return Math.floor(Math.random() * maxCount) + 1;
};



function selectOption(buttonId, option) {
    const button = document.getElementById(buttonId);
    const dropdown = option.parentNode;
    const selectedText = option.innerText;
    button.innerText = selectedText;
    dropdown.style.display = 'none';
  }
  
  function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.style.transition = 'max-height 0.5s ease-in-out';
    dropdown.style.maxHeight = dropdown.style.maxHeight ? null : `${dropdown.scrollHeight}px`;
  }
  
  function handleButtonClick(buttonId) {
    toggleDropdown(`dropdown${buttonId.charAt(buttonId.length - 1)}`);
  }
  