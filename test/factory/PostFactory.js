const faker = require('faker');
const { capitalize } = require('lodash');
const Post = require('../../server/models/postModel');

const fakePost = () => {
  return {
    title: capitalize(faker.lorem.words(3)),
    body: faker.lorem.sentences(10),
    category: capitalize(faker.lorem.word()),
    tags: faker.lorem.words(5).split(' '),
  };
};

const fakeManyPosts = (numPosts = 10) => {
  const posts = [];
  for (let i = 0; i < numPosts; i++) {
    const post = fakePost();
    fakePosts.push(post);
  }

  return posts;
};

const populatePosts = async (numPosts = 10) => {
  await Post.deleteMany({});
  await Post.insertMany(fakeManyPosts(numPosts));
};

module.exports = {
  fakePost,
  populatePosts,
};
