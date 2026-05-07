function returnResponse (response) {
    return response.json()
}
function itemFor (item) {
    const listPokemon = document.getElementById("poke-list")
    const pokeImage = document.createElement('img') 

    const id = item.url.split("/").filter(Boolean).pop()
    pokeImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    
    const namePokemon = document.createElement('p')
    namePokemon.innerHTML = item.name //item.url para captar o id de cada pokemo, desafio alterar cada imagem para o pokemon referente
    
    const line = document.createElement('li')
    line.appendChild(pokeImage)
    line.appendChild(namePokemon)

    listPokemon.appendChild(line)
}

function jsonResponse(json) {
    json.results.forEach(itemFor)
}

function loadPokemonList() {
    
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151")
    .then(returnResponse)
    .then(jsonResponse)
    console.log('Depression')
}