import React from "react"

export default ({ pageContext: { posts } }) => {
  return <div>{JSON.stringify(posts)}</div>
}
