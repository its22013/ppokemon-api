
import App from 'next/app'
import fetch from 'isomorphic-unfetch'

function MyApp ({ Component, pageProps, pokemon }) {
  return (
    <Component {...pageProps} pokemon={pokemon} />
  )
}

MyApp.getInitialProps = async function (appContext) {
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

  const appProps = await App.getInitialProps(appContext)

  return {
    ...appProps,
    pokemon
  }
}

export default MyApp
