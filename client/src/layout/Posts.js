import React from "react"
import ContentContainer from "../components/ContentContainer"
import Card from "../components/Card"
import CardContent from "../components/CardContent"
import Content from "../components/Content"
import lemon from "../../static/lemon.jpg"
import { truncate } from "lodash-es"

const Posts = ({ posts }) => {
  return (
    <ContentContainer>
      <Content>
        {posts.map((post, key) => (
          <Card key={key}>
            <img src={lemon} alt="" />
            <CardContent>
              <h3>{post.title}</h3>
              <p>{truncate(post.body, { length: 120, separator: " " })}</p>
            </CardContent>
          </Card>
        ))}
      </Content>
    </ContentContainer>
  )
}

export default Posts
