import React from "react"
import styled from "styled-components"
import GlobalStyle from "../components/GlobalStyle"
import Container from "../components/Container"
import Sidebar from "../layout/Sidebar"
import Posts from "../layout/Posts"

const PostContainer = styled.div`
  margin-left: 380px;
  flex-grow: 1;
`

export default function Home({ pageContext: { posts } }) {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Sidebar />
        <PostContainer>
          <Posts posts={posts} />
        </PostContainer>
      </Container>
    </>
  )
}
