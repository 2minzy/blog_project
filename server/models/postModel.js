const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// make id available to frontend without underscore _id -> id
postSchema.set('toJSON', {
  virtuals: true,
});

// combine all strings to a single field to make a searching index
postSchema.index({ '$**': 'text' });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
