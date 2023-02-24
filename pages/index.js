import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'

function Index ({ pokemon }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  const handleSelect = (event) => {
    const name = event.target.value
    const selected = pokemon.find(p => p.name === name)
    setSelectedPokemon(selected)
  }

  return (
    <div>
      <h1>ポケモン一覧</h1>
      <select onChange={handleSelect}>
        <option value=''>ポケモンを選んでください...</option>
        {pokemon.map((p) => (
          <option key={p.name} value={p.name}>{p.name}</option>
        ))}
      </select>
      {selectedPokemon && (
        <div>
          <h2>{selectedPokemon.name}</h2>
          <img src={selectedPokemon.image} alt={selectedPokemon.name} />
          <p>{selectedPokemon.description}</p>
        </div>
      )}
    </div>
  )
}

Index.getInitialProps = async function () {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
  const data = await response.json()

  const pokemon = await Promise.all(
    data.results.map(async (p) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`)
      const pokemonData = await res.json()

      const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${p.name}`)
      const pokemonSpeciesData = await res2.json()

      const japaneseNameObj = pokemonSpeciesData.names.find(name => name.language.name === 'ja-Hrkt')
      const japaneseName = japaneseNameObj ? japaneseNameObj.name : p.name

      return {
        name: p.name,
        image: pokemonData.sprites.front_default,
        description: japaneseName
      }
    })
  )

  return {
    pokemon
  }
}

export default Index
