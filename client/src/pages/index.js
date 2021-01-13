import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import lemon from "../../static/lemon.jpg"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    height: 100%;

  }

  a {
  text-decoration: none;
  }

  button {
    border: none;
    outline: none;
    text-align: center;
  }
`
const Container = styled.body`
  display: flex;
`
const ProfileContainer = styled.div`
  background-color: #f6eda0;
  display: flex;
  justify-content: center;
  flex: 1;
  text-align: center;
`
const Profile = styled.div`
  position: fixed;
  padding: 40px;

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
  }

  p {
    width: 200px;
  }
`
const ContentContainer = styled.div`
  background-color: white;
  flex: 4;
  padding: 40px;
`
const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, 300px);
`
const Footer = styled.div`
  margin-top: 440px;

  hr {
    border: black 1px solid;
  }
`
const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 300px;
  height: 400px;
  overflow: hidden;
  box-shadow: 2px 2px 10px #cccccc;
  transition: transform 750ms cubic-bezier(0.2, 1, 0.3, 1);

  &:hover {
    box-shadow: 5px 5px 20px #cccccc;
    transform: translateY(-2%);
  }
  img {
    width: 300px;
    height: 200px;
    object-fit: cover;
  }
  p {
  }
`
const CardContent = styled.div`
  padding: 10px 20px;
`

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <ProfileContainer>
          <Profile>
            <img src={lemon} alt="profile photo" />

            <h2>LEMON BLOG</h2>

            <p>
              I am a web developer focusing on front-end development. Always
              hungry to keep learning.
            </p>
            <Footer>
              <p>CONTACT</p>
              <hr />
              <p>2021 &copy; Minji Lee</p>
            </Footer>
          </Profile>
        </ProfileContainer>

        <ContentContainer>
          <Content>
            <Card>
              <img src={lemon} alt="" />
              <CardContent>
                <h3>Title</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus recusandae enim quis aliquid impedit quo nostrum!
                  Molestias inventore eligendi fuga numquam...
                </p>
              </CardContent>
            </Card>
            <Card>
              <img src={lemon} alt="" />
              <CardContent>
                <h3>Title</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus recusandae enim quis aliquid impedit quo nostrum!
                  Molestias inventore eligendi fuga numquam...
                </p>
              </CardContent>
            </Card>
            <Card>
              <img src={lemon} alt="" />
              <CardContent>
                <h3>Title</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus recusandae enim quis aliquid impedit quo nostrum!
                  Molestias inventore eligendi fuga numquam...
                </p>
              </CardContent>
            </Card>
            <Card>
              <img src={lemon} alt="" />
              <CardContent>
                <h3>Title</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus recusandae enim quis aliquid impedit quo nostrum!
                  Molestias inventore eligendi fuga numquam...
                </p>
              </CardContent>
            </Card>
            <Card>
              <img src={lemon} alt="" />
              <CardContent>
                <h3>Title</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus recusandae enim quis aliquid impedit quo nostrum!
                  Molestias inventore eligendi fuga numquam...
                </p>
              </CardContent>
            </Card>
            <Card>
              <img src={lemon} alt="" />
              <CardContent>
                <h3>Title</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus recusandae enim quis aliquid impedit quo nostrum!
                  Molestias inventore eligendi fuga numquam...
                </p>
              </CardContent>
            </Card>
            <Card>
              <img src={lemon} alt="" />
              <CardContent>
                <h3>Title</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus recusandae enim quis aliquid impedit quo nostrum!
                  Molestias inventore eligendi fuga numquam...
                </p>
              </CardContent>
            </Card>
            <Card>
              <img src={lemon} alt="" />
              <CardContent>
                <h3>Title</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus recusandae enim quis aliquid impedit quo nostrum!
                  Molestias inventore eligendi fuga numquam...
                </p>
              </CardContent>
            </Card>
            <Card>
              <img src={lemon} alt="" />
              <CardContent>
                <h3>Title</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus recusandae enim quis aliquid impedit quo nostrum!
                  Molestias inventore eligendi fuga numquam...
                </p>
              </CardContent>
            </Card>
            <Card>
              <img src={lemon} alt="" />
              <CardContent>
                <h3>Title</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus recusandae enim quis aliquid impedit quo nostrum!
                  Molestias inventore eligendi fuga numquam...
                </p>
              </CardContent>
            </Card>
          </Content>
        </ContentContainer>
      </Container>
    </>
  )
}
