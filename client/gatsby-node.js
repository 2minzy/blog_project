const axios = require("axios")

exports.createPages = async ({ actions: { createPage } }) => {
  const response = await axios.get("http://localhost:5000/api/blog/posts")
  const { posts, pages } = response.data

  createPage({
    path: "/", // index
    component: require.resolve("./src/templates/index.js"),
    context: { posts, pages },
  })

  createPage({
    path: `/posts`,
    component: require.resolve("./src/templates/overview.js"),
    context: { posts, pages },
  })
}
