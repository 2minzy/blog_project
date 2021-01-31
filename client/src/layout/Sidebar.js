import React from "react"
import ProfileContainer from "../components/ProfileContainer"
import Profile from "../components/Profile"
import Footer from "../components/Footer"

import lemon from "../../static/lemon.jpg"

const Sidebar = () => (
  <ProfileContainer>
    <Profile>
      <img src={lemon} alt="profile photo" />

      <h2>LEMON BLOG</h2>

      <p>
        I am a web developer focusing on front-end development. Always hungry to
        keep learning.
      </p>
      <Footer>
        <p>CONTACT</p>
        <hr />
        <p>&copy; {new Date().getFullYear()} | Minji Lee</p>
      </Footer>
    </Profile>
  </ProfileContainer>
)

export default Sidebar
