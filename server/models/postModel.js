const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
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
