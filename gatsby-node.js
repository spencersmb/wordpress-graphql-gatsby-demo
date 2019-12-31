/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const createPosts = require(`./gatsby/createPosts`)

exports.createPages = async ({ actions, graphql }) => {
  const pluginOptions = {
    wordPressUrl: `http://wpgraphql.local/`,
    uploadsUrl: `http://wpgraphql.local/wp-content/uploads/`,
  }
  await createPosts({ actions, graphql }, pluginOptions)
}
