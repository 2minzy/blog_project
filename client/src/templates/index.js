import React from "react"
import GlobalStyle from "../components/GlobalStyle"
import Container from "../components/Container"
import Sidebar from "../layout/Sidebar"
import Posts from "../layout/Posts"

export default function Home({ pageContext: { posts } }) {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Sidebar />
        <Posts posts={posts} />
      </Container>
    </>
  )
}
