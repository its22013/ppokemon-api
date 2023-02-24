export const fetchPokemons = async () => {
  // limit=151で最初の151匹を所得。
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const data = await res.json()
  const results = data.results

  const dataPromise = []
  for (let i = 0; i < results.length; i++) {
    const result = results[i]
    dataPromise.push(fetchPokemon(result.name))
  }

  return await Promise.all(dataPromise)
}

export const fetchPokemon = async (id) => {
  // ポケモンの基本データを取得。
  const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const pokemonData = await pokemonRes.json()

  // ポケモンの種族データを取得。
  const speciesRes = await fetch(pokemonData.species.url)
  const speciesData = await speciesRes.json()

  return {
    id: pokemonData.name,
    index: speciesData.pokedex_numbers.find(data => data.pokedex.name === 'national').entry_number,
    name: speciesData.names.find(data => data.language.name === 'ja-Hrkt').name,
    image: pokemonData.sprites.front_default,
    genus: speciesData.genera.find(data => data.language.name === 'ja-Hrkt').genus,
    types: pokemonData.types,
    height: pokemonData.height,
    weight: pokemonData.weight
  }
}
