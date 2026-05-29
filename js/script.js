const params = new URLSearchParams(window.location.search);
const gen = params.get('gen') || 1;

const genConfig = {
    1: { offset: 0, limit: 151, class: 'gen1' },
    2: { offset: 151, limit: 100, class: 'gen2' },
    3: { offset: 251, limit: 135, class: 'gen3' },
    4: { offset: 386, limit: 107, class: 'gen4' },
    5: { offset: 493, limit: 156, class: 'gen5' },
    6: { offset: 649, limit: 72, class: 'gen6' }
};

function loadPokemonList() {
    const config = genConfig[gen];
    // Aplica a classe da geração no body para mudar o CSS
    document.body.className = config.class;

    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${config.offset}&limit=${config.limit}`) // Pega os pokémons da geração selecionada
        .then(res => res.json()) // Converte a resposta para JSON
        // Exibe os pokémons na tela
        .then(json => {
            const listPokemon = document.getElementById("poke-list");
            listPokemon.innerHTML = "";
            json.results.forEach(itemFor);
        });
}

// Exibe um pokémon na tela
function itemFor(item) {
    const listPokemon = document.getElementById("poke-list");
    
    const id = item.url.split("/").filter(Boolean).pop(); // Pega o id do pokémon a partir da URL, onde a URL tem a estrutura "https://pokeapi.co/api/v2/pokemon/{id}/", então ao dividir a URL por "/" e filtrar os elementos vazios, o último elemento é o id do pokémon.

    const line = document.createElement('li');
    line.innerHTML = `
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
        <p>${item.name}</p>
        <button onclick="saveFavorite('${item.name}', '${id}')">⭐ SALVAR</button>
    `;
    listPokemon.appendChild(line);
}

// Salvando os pokémons favoritos na localStorage, onde o nome e o id do pokémon são salvos em um array de objetos, e depois convertidos para string para serem armazenados. Antes de salvar, verifica se o pokémon já está na lista de favoritos para evitar duplicatas.

function saveFavorite(name, id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(p => p.id === id)) {
        favorites.push({ name, id });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert("Capturado com sucesso!");
    }
}

function loadFavorites() {
    const list = document.getElementById("poke-list");
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    list.innerHTML = "";
    if (favorites.length === 0) {
        list.innerHTML = "<p style='color:white; grid-column: 1/-1;'>Sua Pokédex de favoritos está vazia!</p>";
        return;
    }

    // Exibe os pokémons favoritos na tela
    favorites.forEach(poke => {
        const line = document.createElement('li');
        // Exibe a imagem do pokémon usando o id para pegar a imagem correta. Exibe o nome do pokémon. Botão para remover o pokémon dos favoritos, passando o id para a função de remoção
        line.innerHTML = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png"> 
            <p>${poke.name}</p> 
            <button onclick="removeFavorite('${poke.id}')" style="background:#ff4444; color:white;">❌ SOLTAR</button> 
        `;
        list.appendChild(line);
    });
}

function removeFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(p => p.id !== id); // Remove um pokémon da lista de favoritos, onde o id é diferente do id passado Ex:(1 !== 5) = fica na lista, Ex:(1 !== 1) = remove da lista
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites(); // Recarrega a lista na tela
}