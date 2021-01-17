import styled from "styled-components"

const Card = styled.div`
  background-color: white;
  position: relative;

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

  &::after {
    content: "";
    position: absolute;
    background-color: white;
    width: 300px;
    height: 20px;
    bottom: 0;
  }
`

export default Card
