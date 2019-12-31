import React from "react"
import { graphql } from "gatsby"
import contentParser from "gatsby-wpgraphql-inline-images"

const Post = props => {
  const pluginOptions = {
    wordPressUrl: `http://wpgraphql.local/`,
    uploadsUrl: `http://wpgraphql.local/wp-content/uploads/`,
  }
  const {
    // location,
    pageContext: {
      content,
    },
    data: {
      wpgraphql: { support: { title } },
    },
  } = props


  return (
    <div>
      <h1>{title}</h1>
      <div>
        {contentParser({ content }, pluginOptions)}
      </div>
    </div>
  )
}

export default Post

export const pageQuery = graphql`
    query GET_POST($id: ID!) {
        wpgraphql {
            support(id: $id) {
                title
                content
            }
        }
    }
`
