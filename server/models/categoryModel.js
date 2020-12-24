const mongoose = require('mongoose');
const { toSlug } = require('../utils/slug');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
});

// Middleware will happen whenever you are doin createCategory BEFORE(pre) saving to database
categorySchema.pre('save', function (next) {
  const category = this;

  if (!category.slug || category.slug === '') {
    category.slug = toSlug(category.name);
  }
  next(); // Next strp is saving category into MongoDB database
});

// make id available to frontend without underscore _id -> id
categorySchema.set('toJSON', {
  virtuals: true,
});

// combine all strings to a single field to make a searching index
categorySchema.index({ '$**': 'text' });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
