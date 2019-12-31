/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import contentParser from "gatsby-wpgraphql-inline-images"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
      query SiteTitleQuery {
          site {
              siteMetadata {
                  title
              }
          }
          wpgraphql {
              supports {
                  edges {
                      node {
                          content
                          slug
                          title
                      }
                  }
              }
          }
      }
  `)

  console.log("data", data)
  const pluginOptions = {
    wordPressUrl: `http://wpgraphql.local/`,
    uploadsUrl: `http://wpgraphql.local/wp-content/uploads/`,
  }
  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title}/>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <div>
          {data.wpgraphql.supports.edges.map((item) => {
            const node = item.node
            const content = node.content
            return (
              <div>
                <h1>{node.title}</h1>
                <div>{contentParser({ content }, pluginOptions)}</div>
                {/*<div dangerouslySetInnerHTML={{ __html: content }}/>*/}
              </div>
            )
          })}
        </div>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
