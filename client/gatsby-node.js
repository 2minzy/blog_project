const axios = require("axios")

exports.createPages = async ({ actions: { createPage } }) => {
  // `getPokemonData` is a function that fetches our data
  const response = await axios.get("http://localhost:5000/api/blog/posts")
  const posts = response.data
  // Create a page that lists all Pokémon.
  createPage({
    path: `/posts`,
    component: require.resolve("./src/templates/overview.js"),
    context: { posts },
  })
  // Create a page for each Pokémon.
  // allPokemon.forEach(pokemon => {
  //   createPage({
  //     path: `/pokemon/${pokemon.name}/`,
  //     component: require.resolve("./src/templates/pokemon.js"),
  //     context: { pokemon },
  //   })
  // })
}
