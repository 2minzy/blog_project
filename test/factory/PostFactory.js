const faker = require('faker');
const { capitalize, kebabCase } = require('lodash');
const Post = require('../../server/models/postModel');
const User = require('../../server/models/userModel');

const getFirstUser = async () => {
  return await User.findOne({}); // if it's empty {} find very first one
};

const fakePost = userId => {
  const title = capitalize(faker.lorem.words(3));
  return {
    title,
    body: faker.lorem.sentences(10),
    category: capitalize(faker.lorem.word()),
    tags: faker.lorem.words(5).split(' '),
    slug: `${kebabCase(title)}-${Math.round(Math.random() * 1000)}`,
    publisher: userId,
  };
};

const fakeManyPosts = (numPosts = 10, userId = '') => {
  const posts = [];
  for (let i = 0; i < numPosts; i++) {
    const post = fakePost(userId);
    posts.push(post);
  }

  return posts;
};

const populatePosts = async (numPosts = 10) => {
  const user = await getFirstUser();

  await Post.deleteMany({});
  await Post.insertMany(fakeManyPosts(numPosts, user._id));
};

module.exports = {
  fakePost,
  populatePosts,
};
